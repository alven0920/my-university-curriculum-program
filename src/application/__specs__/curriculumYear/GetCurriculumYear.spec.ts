import { CurriculumYear } from '../../../domain/Curriculum';
import { CurriculumYearRepoFactory } from '../../../repository/factories/CurriculumYearRepoFactory';
import { GetCurriculumYear } from '../../curriculumYear/GetCurriculumYear';

const cyears: CurriculumYear[] = [
  {
    id: '12345',
    semesters: [
      'SEM-1',
      'SEM-2'
    ],
    year: 1
  },
  {
    id: '45678',
    semesters: [
      'SEM-1',
      'SEM-2'
    ],
    year: 2
  }
];

describe('Get Curriculum Year', () => {
  afterEach((done) => {
    jest.clearAllMocks();

    done();
  });

  it('should get a particular curriculum year', async (done) => {
    jest.spyOn(CurriculumYearRepoFactory, 'getInstanceByTenant').mockReturnValueOnce({
      getUniqueId: async () => '12345',
      add: async (cy: CurriculumYear) => true,
      update: async (cy: CurriculumYear) => true,
      getById: async (id: string) => cyears.find(({ id: yearId }) =>  yearId === id) || {},
      getByIds: async (id: string[]) => cyears
    });

    const getCYearUseCase = new GetCurriculumYear();

    const cyearDto = await getCYearUseCase.execute({ yearId: '12345' });

    expect(cyearDto).toBeDefined();

    done();
  });
});