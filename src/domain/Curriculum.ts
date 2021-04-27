export interface Curriculum {
  curriculumId?: string;
  courseId?: string;

  // CurriculumYear IDs
  curriculumYears?: string[];
}

export interface CurriculumYear {
  id?: string;
  year?: number;

  // CurriculumSemester IDs
  semesters?: string[];
}

export interface CurriculumSemester {
  id?: string;
  semester?: number;

  // Subject codes
  subjects?: string[];
}