import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, map, shareReplay } from 'rxjs/operators';
import { AsvsData, VerificationRequirement, AsvsResult, AsvsCategory, VerificationLevel, FilterOptions, EnhancedRequirement, RequirementStatus, AssessmentMap } from '../models/asvs.model';

const LS_KEY = 'asvs_data_cache';
const LS_ASSESSMENT_KEY = 'asvs_assessments';

/**
 * Service to manage ASVS data
 * Provides methods to fetch, filter, and search ASVS requirements
 * Uses localStorage to cache data for instant subsequent loads
 */
@Injectable({
  providedIn: 'root'
})
export class AsvsService {
  private data$: Observable<AsvsData>;
  private assessments$ = new BehaviorSubject<AssessmentMap>(this.loadAssessments());

  constructor(private http: HttpClient) {
    // Try to load from localStorage first for instant response
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try {
        const parsed: AsvsData = JSON.parse(cached);
        this.data$ = of(parsed);
      } catch {
        this.data$ = this.fetchAndCache();
      }
    } else {
      this.data$ = this.fetchAndCache();
    }
  }

  /** Fetch from HTTP and persist result in localStorage */
  private fetchAndCache(): Observable<AsvsData> {
    return this.http.get<AsvsData>('/assets/data/asvs.json').pipe(
      tap((data) => {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch {
          // Storage quota exceeded — ignore
        }
      }),
      shareReplay(1)
    );
  }

  /** Force a fresh fetch from server and update cache */
  refreshCache(): Observable<AsvsData> {
    this.data$ = this.fetchAndCache();
    return this.data$;
  }

  /** Clear the localStorage cache */
  clearCache(): void {
    localStorage.removeItem(LS_KEY);
  }

  /**
   * Get all ASVS data
   */
  getAsvsData(): Observable<AsvsData> {
    return this.data$;
  }

  /**
   * Get all requirements for a specific category
   */
  getRequirementsByCategory(category: AsvsCategory): Observable<VerificationRequirement[]> {
    return this.data$.pipe(
      map((data) => data?.[category] || [])
    );
  }

  /**
   * Get requirements for a specific level
   */
  getRequirementsByLevel(level: VerificationLevel): Observable<EnhancedRequirement[]> {
    return this.data$.pipe(
      map((data) => {
        if (!data) return [];
        const allRequirements: EnhancedRequirement[] = [];
        const categories = Object.keys(data).filter((k) => k !== 'ASVS Results') as AsvsCategory[];

        for (const category of categories) {
          (data[category] as VerificationRequirement[]).forEach((req: VerificationRequirement) => {
            const enhanced: EnhancedRequirement = {
              ...req,
              category,
              levels: this.getApplicableLevels(req),
            };
            if (enhanced.levels.includes(level)) {
              allRequirements.push(enhanced);
            }
          });
        }
        return allRequirements;
      })
    );
  }

  /**
   * Get all categories
   */
  getCategories(): Observable<AsvsCategory[]> {
    return this.data$.pipe(
      map((data) => {
        if (!data) return [];
        return Object.keys(data).filter((k) => k !== 'ASVS Results') as AsvsCategory[];
      })
    );
  }

  /**
   * Get ASVS results/summary
   */
  getAsvsResults(): Observable<AsvsResult[]> {
    return this.data$.pipe(
      map((data) => data?.['ASVS Results'] || [])
    );
  }

  /**
   * Filter requirements by category, level, and search term
   */
  filterRequirements(options: FilterOptions): Observable<EnhancedRequirement[]> {
    return this.data$.pipe(
      map((data) => {
        if (!data) return [];
        let allRequirements: EnhancedRequirement[] = [];

        // If category is specified, only get that category
        const categoriesToSearch = options.category ? [options.category] : (Object.keys(data).filter((k) => k !== 'ASVS Results') as AsvsCategory[]);

        for (const category of categoriesToSearch) {
          (data[category] as VerificationRequirement[]).forEach((req: VerificationRequirement) => {
            const enhanced: EnhancedRequirement = {
              ...req,
              category,
              levels: this.getApplicableLevels(req),
            };

            // Filter by level if specified
            if (options.level && !enhanced.levels.includes(options.level)) {
              return;
            }

            // Filter by search term if specified
            if (options.searchTerm) {
              const searchLower = options.searchTerm.toLowerCase();
              const matchesSearch =
                req['#'].toLowerCase().includes(searchLower) ||
                req['Area'].toLowerCase().includes(searchLower) ||
                req['Verification Requirement'].toLowerCase().includes(searchLower) ||
                (req['CWE'] || '').toLowerCase().includes(searchLower);
              if (!matchesSearch) {
                return;
              }
            }

            allRequirements.push(enhanced);
          });
        }

        return allRequirements;
      })
    );
  }

  /**
   * Search requirements across all categories
   */
  searchRequirements(searchTerm: string): Observable<EnhancedRequirement[]> {
    return this.filterRequirements({ searchTerm });
  }

  /**
   * Get applicable levels for a requirement
   */
  private getApplicableLevels(req: VerificationRequirement): VerificationLevel[] {
    // "ASVS Level" is the minimum required level (1, 2, or 3)
    // A level-1 requirement applies to L1, L2, and L3
    // A level-2 requirement applies to L2 and L3
    // A level-3 requirement applies only to L3
    const level = parseInt(req['ASVS Level'], 10);
    const levels: VerificationLevel[] = [];
    if (level <= 1) levels.push(VerificationLevel.LEVEL_1);
    if (level <= 2) levels.push(VerificationLevel.LEVEL_2);
    if (level <= 3) levels.push(VerificationLevel.LEVEL_3);
    return levels;
  }

  /**
   * Get count of requirements by category
   */
  getRequirementCount(category: AsvsCategory): Observable<number> {
    return this.data$.pipe(
      map((data) => data?.[category]?.length || 0)
    );
  }

  /**
   * Get totals across all categories
   */
  getTotals(): Observable<{ total: number; categories: number }> {
    return this.data$.pipe(
      map((data) => {
        const categories = Object.keys(data).filter((k) => k !== 'ASVS Results') as AsvsCategory[];
        let total = 0;
        for (const category of categories) {
          total += (data[category] as VerificationRequirement[]).length;
        }
        return { total, categories: categories.length };
      })
    );
  }

  // ── Assessment / status tracking ────────────────────────────────────────────

  private loadAssessments(): AssessmentMap {
    try {
      const raw = localStorage.getItem(LS_ASSESSMENT_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }

  private saveAssessments(map: AssessmentMap): void {
    try { localStorage.setItem(LS_ASSESSMENT_KEY, JSON.stringify(map)); } catch {}
  }

  getAssessments(): Observable<AssessmentMap> {
    return this.assessments$.asObservable();
  }

  setRequirementStatus(requirementId: string, status: RequirementStatus, note?: string): void {
    const current = { ...this.assessments$.value };
    if (status === null) {
      delete current[requirementId];
    } else {
      current[requirementId] = { requirementId, status, note };
    }
    this.saveAssessments(current);
    this.assessments$.next(current);
  }

  getRequirementStatus(requirementId: string): RequirementStatus {
    return this.assessments$.value[requirementId]?.status ?? null;
  }

  clearAssessments(): void {
    this.saveAssessments({});
    this.assessments$.next({});
  }

  getCategoryProgress(category: AsvsCategory): Observable<{ pass: number; fail: number; notApplicable: number; pending: number; total: number }> {
    return new Observable(observer => {
      this.data$.subscribe(data => {
        this.assessments$.subscribe(assessments => {
          const reqs: VerificationRequirement[] = data?.[category] || [];
          let pass = 0, fail = 0, notApplicable = 0;
          for (const req of reqs) {
            const s = assessments[req['#']]?.status;
            if (s === 'pass') pass++;
            else if (s === 'fail') fail++;
            else if (s === 'not-applicable') notApplicable++;
          }
          observer.next({ pass, fail, notApplicable, pending: reqs.length - pass - fail - notApplicable, total: reqs.length });
          observer.complete();
        });
      });
    });
  }
}
