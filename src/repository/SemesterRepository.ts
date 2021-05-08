import { CurriculumSemester } from '../domain/Curriculum';

export abstract class SemesterRepository {
  abstract getUniqueId(): Promise<string>;
  abstract add(sem: CurriculumSemester): Promise<boolean | Error>;
  abstract update(sem: CurriculumSemester): Promise<boolean | Error>;
}
