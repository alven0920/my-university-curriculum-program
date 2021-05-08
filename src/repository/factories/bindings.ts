import { CurriculumRepository } from '../CurriculumRepository';
import { CurriculumYearRepository } from '../CurriculumYearRepository';
import { SemesterRepository } from '../SemesterRepository';

export const curriculumBinding: Record<string, typeof CurriculumRepository | null> = {
  default: null
};

export const curriculumYearsBindings: Record<string, typeof CurriculumYearRepository | null> = {
  default: null
};

export const semesterBindings: Record<string, typeof SemesterRepository | null> = {
  default: null
};