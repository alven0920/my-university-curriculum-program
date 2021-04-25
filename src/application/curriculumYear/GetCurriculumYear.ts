import { CurriculumYearRepoFactory } from '../../repository/factories/CurriculumYearRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  yearId: string;
};

type ResponseDTO = {
  id: string,
  semesters: string[],
  year
};

export class GetCurriculumYear extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const { tenantId = '', yearId } = args;

    const dataSource = CurriculumYearRepoFactory.getInstanceByTenant(tenantId);

    const { id = '', year = 0, semesters = [] } = await dataSource?.getById(yearId) || {};

    return {
      id,
      semesters,
      year
    };
  }
}
