import IUseCase from '../shared/IUseCase';
import { SemesterRepoFactory } from '../../repository/factories/SemesterRepoFactory';
import { MultiTenantReqDTO } from '../shared/MultiTenantReqDTO';

type RequestDTO = MultiTenantReqDTO & {
  semester: number;
  subjects: string[];
};

type ResponseDTO = {
  message: string;
};

export class AddSemester extends IUseCase<RequestDTO, ResponseDTO> {
  async execute(args: RequestDTO): Promise<ResponseDTO> {
    const {
      tenantId = '',
      semester,
      subjects
    } = args;

    try {
      const dataSource = SemesterRepoFactory.getInstanceByTenant(tenantId);

      if (!dataSource) {
        throw new Error('Unknown Data Source Error');
      }

      const id = await dataSource.getUniqueId();

      const isAdded = await dataSource?.add({
        id,
        semester,
        subjects
      });

      return {
        message: isAdded ? 'Success' : 'Failed'
      };
    } catch (error) {
      return {
        message: error
      };
    }
  }
}
