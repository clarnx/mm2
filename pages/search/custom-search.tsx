import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { skillsMock } from '../../lib/mocks/skills.mock';
import { NextPageWithLayout } from '../page';

const CustomSearchPage: NextPageWithLayout = () => {
  const MAX_STEPS = 3;
  const [formStep, setFormStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderButton = () => {
    if (formStep > MAX_STEPS) {
      return undefined;
    }
    if (formStep === MAX_STEPS) {
      return (
        <div className="absolute bottom-5 right-5 flex gap-3">
          <Button
            type="button"
            onClick={() => setFormStep((prev) => prev - 1)}
            variant="outlined"
          >
            Back
          </Button>
          <Button type="submit" disabled={!isValid}>
            Post Job & View Talent
          </Button>
        </div>
      );
    } else {
      return (
        <div className="absolute bottom-5 right-5 flex gap-3">
          {formStep !== 0 && (
            <Button
              type="button"
              onClick={() => setFormStep((prev) => prev - 1)}
              variant="outlined"
            >
              Back
            </Button>
          )}
          <Button type="button" onClick={() => setFormStep((prev) => prev + 1)}>
            Next Step
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-[75vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between"
        action=""
      >
        {formStep <= 0 && (
          <SkillsForm
            formStep={formStep}
            skills={skills}
            setSkills={setSkills}
          />
        )}
        {formStep <= 1 && (
          <JobDetails formStep={formStep} errors={errors} register={register} />
        )}

        {formStep <= 2 && (
          <BudgetForm formStep={formStep} errors={errors} register={register} />
        )}
        {renderButton()}
      </form>
    </div>
  );
};

CustomSearchPage.getLayout = (page) => {
  return <PrimaryLayout pageTitle="Custom Search">{page}</PrimaryLayout>;
};
export default CustomSearchPage;

interface ISkillForm {
  formStep: number;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

const SkillsForm = ({ formStep, skills, setSkills }: ISkillForm) => {
  const [selectValue, setSelectValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addSkillToSelected = (value: string) => {
    setError(null);
    if (!skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
      setSelectValue('');
    }
  };

  const deleteSkillFromSelected = (value: string) => {
    const filterSkills = skills.filter((skill) => skill !== value);
    setSkills(filterSkills);
    filterSkills.length > 0
      ? setError(null)
      : setError('This field is required');
  };

  return (
    <section className={formStep === 0 ? 'block' : 'hidden'}>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Skills for this role</h2>
        <div>
          <select
            onChange={(e) => addSkillToSelected(e.target.value)}
            id="skills"
            className={`border border-gray-600 capitalize px-2 py-2 w-full ${
              error && 'border-red-300'
            }`}
            value={selectValue}
          >
            <option value="" disabled></option>
            {skillsMock.map((skill, index) => (
              <option className="capitalize " key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {error && <small className="text-red-300">{error}</small>}
        </div>
        <div className="flex gap-3 text-xs flex-wrap">
          {skillsMock?.map((skill, index) => (
            <span
              onClick={() => addSkillToSelected(skill)}
              className="bg-teal-50 text-teal-400 capitalize px-2 py-1 rounded-md transition-all hover:shadow-sm cursor-pointer"
              key={index}
            >
              {skill} +
            </span>
          ))}
        </div>
        <div>
          <div
            className={`min-h-[200px] bg-teal-50 mt-8 w-full p-8 ${
              skills.length === 0 && 'flex items-center justify-center'
            } `}
          >
            {skills.length === 0 ? (
              <p className="font-sans font-light text-gray-800">
                Add at least <span className="font-bold">1 skill</span> to
                complete your job{' '}
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {skills?.map((skill, index) => (
                  <span
                    onClick={() => deleteSkillFromSelected(skill)}
                    key={index}
                    className="bg-white flex relative text-teal-400 capitalize px-3 py-1 rounded-md transition-all hover:shadow-sm cursor-pointer"
                  >
                    {skill}
                    <IoMdClose className="absolute top-1 right-1" size={10} />
                  </span>
                ))}
              </div>
            )}
          </div>
          {skills.length > 0 && (
            <small className="text-gray-800">
              You added {skills.length} skills
            </small>
          )}
        </div>
      </div>
    </section>
  );
};

interface IJobDetails {
  formStep: number;
  register: UseFormRegister<FieldValues>;
  errors: any;
}
const JobDetails = ({ formStep, register, errors }: IJobDetails) => {
  return (
    <section className={formStep === 1 ? 'block' : 'hidden'}>
      <div className="flex flex-col gap-3">
        <h2>Job Details</h2>
        <div>
          <label htmlFor="skills">Role type*</label>
          <select
            {...register('job_details', {
              required: 'this is mandatory',
            })}
          >
            <option value="1"> Option1 </option>
            <option value="1"> Option1 </option>
            <option value="1"> Option1 </option>
            <option value="1"> Option1 </option>
          </select>
        </div>
        <div>
          <label htmlFor="title">Starting date</label>
          <input
            className="border border-gray-600"
            type="title"
            {...register('starting_date', {
              required: 'this is mandatory',
            })}
          />
        </div>
        <div>
          <label htmlFor="title">Job Title</label>
          <input
            className="border border-gray-600"
            type="title"
            {...register('job_title', { required: 'this is mandatory' })}
          />
        </div>
        <div>
          <label htmlFor="title">Job Descriptio</label>
          <textarea
            className="border border-gray-600"
            {...register('job_description', {
              required: 'this is mandatory',
            })}
          />
        </div>
      </div>
    </section>
  );
};

interface IBudgetForm {
  formStep: number;
  register: UseFormRegister<FieldValues>;
  errors: any;
}
const BudgetForm = ({ formStep, errors, register }: IBudgetForm) => {
  return (
    <section className={formStep === 2 ? 'block' : 'hidden'}>
      <div className="flex flex-col gap-3">
        <h2>Budget</h2>
        <small>
          $4,900.00 USD is the avarage budget for Part-Time (20h) jobs with
          similar skills
        </small>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="job_details">Minimun budget USD</label>
            <input
              className="border border-gray-600"
              type="text"
              {...register('min_budget', {
                required: 'this is mandatory',
              })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="job_details">Max budget USD</label>
            <input
              className="border border-gray-600"
              type="text"
              {...register('max_budget', {
                required: 'this is mandatory',
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
