import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
interface IJobDetails {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  jobDetails: any;
  setJobDetails: React.Dispatch<React.SetStateAction<any>>;
}

export const JobDetails = ({
  formStep,
  setFormStep,
  setJobDetails,
  jobDetails,
}: IJobDetails) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm({
    defaultValues: jobDetails,
    mode: 'all',
  });

  const onSubmit = (data: any) => {
    if (isDirty) {
      setJobDetails(data);
    }
    setFormStep((prev) => prev + 1);
  };

  return (
    <section
      className={`h-full flex flex-col justify-between ${
        formStep === 1 ? 'block' : 'hidden'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full justify-between"
      >
        <div className="flex flex-col  gap-3">
          <h2 className="text-xl font-semibold">Job Details</h2>
          <div className="flex flex-col">
            <label htmlFor="rol-types">Role type*</label>
            <select
              defaultValue={''}
              className="app-input w-full outline-none sm:w-1/2"
              {...register('rol_types', {
                required: 'this field is required',
              })}
            >
              <option value="" disabled>
                Choose an option
              </option>
              <option value="part-time"> Part-Time (20H) </option>
              <option value="full-time"> Full-Time (40H) </option>
              <option value="freelance"> Freelance </option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="job_title">Job Title</label>
            <input
              className="app-input"
              type="title"
              {...register('job_title', { required: 'This field is required' })}
            />
            <ErrorMessage
              as={'span'}
              className={'text-red-400 text-xs'}
              errors={errors}
              name="job_title"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col flex-grow">
              <label htmlFor="title">Starting date</label>
              <input
                placeholder="Select a date"
                className="app-input"
                type={'date'}
                {...register('starting_date', {
                  required: 'This field is required',
                })}
              />
              <ErrorMessage
                as={'span'}
                className={'text-red-400 text-xs'}
                errors={errors}
                name="starting_date"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="skills">Total years of experience*</label>
              <select
                defaultValue={''}
                className="app-input "
                {...register('job_details', {
                  required: 'this is mandatory',
                })}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="part-time">
                  {' '}
                  Less than 1 year of experience
                </option>
                <option value="full-time">
                  {' '}
                  From 1 to 3 years of experience
                </option>
                <option value="freelance">
                  {' '}
                  From 3 to 6 years of experience{' '}
                </option>
                <option value="freelance">
                  {' '}
                  More than 6 years of experience{' '}
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-col flex-grow">
              <label htmlFor="time_zone">Your Time Zone*</label>
              <select
                defaultValue={''}
                className="app-input"
                {...register('time_zone', {
                  required: 'this is mandatory',
                })}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="part-time">
                  {' '}
                  (UTC - 07:00) America/Los_angeles{' '}
                </option>
                <option value="part-time">
                  {' '}
                  (UTC - 07:00) America/Los_angeles{' '}
                </option>
                <option value="part-time">
                  {' '}
                  (UTC - 07:00) America/Los_angeles{' '}
                </option>
              </select>
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="overlapping_hours">
                Minimum overlapping hours
              </label>
              <select
                defaultValue={''}
                className="app-input"
                {...register('overlapping_hours', {
                  required: 'this is mandatory',
                })}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="part-time"> No overlap needed </option>
                <option value="full-time"> No overlap needed </option>
                <option value="freelance"> No overlap needed </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="job_description">Job Description</label>
            <textarea
              rows={5}
              className="app-input"
              {...register('job_description', {
                required: 'This field is required',
              })}
            />
            <ErrorMessage
              as={'span'}
              className={'text-red-400 text-xs'}
              errors={errors}
              name="job_description"
            />
          </div>
        </div>
        <div className="py-6 flex gap-3 justify-end">
          <Button
            color="blue-gray"
            onClick={() => setFormStep((prev) => prev - 1)}
            type="button"
            variant="outlined"
          >
            Back
          </Button>
          <Button
            className="bg-app-blue"
            color="blue-gray"
            disabled={!isValid}
            type="submit"
          >
            Next Step
          </Button>
        </div>
      </form>
    </section>
  );
};
