import { CurriculumRepository } from '../CurriculumRepository';
import { CurriculumYearRepository } from '../CurriculumYearRepository';

export const curriculumBinding: Record<string, typeof CurriculumRepository | null> = {
  default: null
};

export const curriculumYearsBindings: Record<string, typeof CurriculumYearRepository | null> = {
  default: null
};