import { SubjectRepoFactory } from '../../repository/factories/SubjectRepoFactory';
import IUseCase from '../shared/IUseCase';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  ids: string[];
};

type ResponseDTO = {
  code: string;
  description: string;
  semester: number;
  units: number;
  preRequisites: string[];
};

export class GetSubjects extends IUseCase<RequestDTO, ResponseDTO[]> {
  async execute(args: RequestDTO): Promise<ResponseDTO[]> {
    const { tenantId = '', ids } = args;

    const dataSource = SubjectRepoFactory.getInstanceByTenant(tenantId);

    if (!dataSource) {
      throw new Error('Unknown data source encountered');
    }

    const subjects = await dataSource.getByIds(ids);

    return subjects.map(({
      code = '',
      description = '',
      preRequisites = [],
      semesterAvailable: semester = 0,
      units = 0
    }) => ({
      code,
      description,
      preRequisites,
      semester,
      units
    }));
  }

}