import { Curriculum, CurriculumYear } from '../../../domain/Curriculum';
import { CurriculumRepoFactory } from '../../../repository/factories/CurriculumRepoFactory';

import { AddCurriculum } from '../../../application/curriculum/AddCurriculum';
import { CurriculumYearRepoFactory } from '../../../repository/factories/CurriculumYearRepoFactory';

describe('Get Registration Service', () => {
  afterEach((done) => {
    jest.clearAllMocks();

    done();
  });

  it('should add a curriculum with basic information', async (done) => {
    jest.spyOn(CurriculumRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getUniqueId: async () => '12345',
      add: async (curr: Curriculum) => true,
      getById: async (id: string) => ({}),
      update: async (curr: Curriculum) => true,
    });

    jest.spyOn(CurriculumYearRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      add: async (cy: CurriculumYear) => true,
      getById: async (id: string) => ({}),
      getByIds: async (ids: string[]) => [],
      getUniqueId: async () => '12345',
      update: async (cy: CurriculumYear) => true
    });

    const addUseCase = new AddCurriculum();
    const result = await addUseCase.execute({
      courseId: '1234-5678-9012-3456',
      numberOfYears: 4
    });

    expect(result.message).toEqual('Success');

    done();
  });
});