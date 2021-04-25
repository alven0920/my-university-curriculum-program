import { CurriculumRepoFactory } from '../../repository/factories/CurriculumRepoFactory';
import { CurriculumYearRepoFactory } from '../../repository/factories/CurriculumYearRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  courseId: string;
  numberOfYears: number;
};

type ResponseDTO = {};

export class AddCurriculum extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const {
      tenantId = '',
      courseId,
      numberOfYears
    } = args;

    const curriculumDs = CurriculumRepoFactory.getInstanceByTenant(tenantId);
    const curriculumYrDs = CurriculumYearRepoFactory.getInstanceByTenant(tenantId);

    const curriculumYears: string[] = [];

    for (let i = 0; i < numberOfYears; i++) {
      // add curriculum years
      // TODO - better handling of null value
      const yearId = await curriculumYrDs?.getUniqueId() || '';

      curriculumYears.push(yearId);
      
      await curriculumYrDs?.add({ id: yearId });
    }

    const uniqueId = await curriculumDs?.getUniqueId();

    /**
     * In particular use case
     * 
     * 1. Define Curriculum
     * 2. Select Course
     * 3. Number of Years
     */
    await curriculumDs?.add({
      courseId,
      curriculumId: uniqueId,
      curriculumYears
    });
    
    return {};
  }
}