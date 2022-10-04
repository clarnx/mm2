import { ErrorMessage } from '@hookform/error-message';
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm({
    defaultValues: jobDetails || {
      rol_types: '',
      job_title: '',
      starting_date: '',
      years_experience: '',
      time_zone: '',
      overlapping_hours: '',
      job_description: '',
    },
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
            <Controller
              name="rol_types"
              control={control}
              rules={{
                required: 'This is required.',
              }}
              render={({ field }) => (
                <Select label="Role type" {...field}>
                  <Option value="part-time">Part-Time (20H)</Option>
                  <Option value="part-time">Part-Time (40H)</Option>
                  <Option value="part-time">Part-Time (60H)</Option>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col">
            <Controller
              name="job_title"
              control={control}
              rules={{ required: 'This is required.' }}
              render={({ field }) => <Input label="Job Title" {...field} />}
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
              <Controller
                name="starting_date"
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field }) => (
                  <Input type={'date'} label="Starting date" {...field} />
                )}
              />
              <ErrorMessage
                as={'span'}
                className={'text-red-400 text-xs'}
                errors={errors}
                name="starting_date"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <Controller
                name="years_experience"
                control={control}
                rules={{
                  required: 'This is required.',
                }}
                render={({ field }) => (
                  <Select label="Total years of experience" {...field}>
                    <Option value="part-time">Part-Time (20H)</Option>
                    <Option value="part-time">Part-Time (40H)</Option>
                    <Option value="part-time">Part-Time (60H)</Option>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex flex-col flex-grow">
              <Controller
                name="time_zone"
                control={control}
                rules={{
                  required: 'This is required.',
                }}
                render={({ field }) => (
                  <Select label="Time Zone" {...field}>
                    <Option value="part-time">
                      {' '}
                      (UTC - 07:00) America/Los_angeles{' '}
                    </Option>
                    <Option value="part-time">
                      {' '}
                      (UTC - 07:00) America/Los_angeles{' '}
                    </Option>
                    <Option value="part-time">
                      {' '}
                      (UTC - 07:00) America/Los_angeles{' '}
                    </Option>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <Controller
                name="overlapping_hours"
                control={control}
                rules={{
                  required: 'This is required.',
                }}
                render={({ field }) => (
                  <Select label="Minumin overlapping hours" {...field}>
                    <Option value="part-time"> No overlap needed</Option>
                    <Option value="part-time"> No overlap needed</Option>
                    <Option value="part-time"> No overlap needed</Option>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Controller
              name="job_description"
              control={control}
              rules={{ required: 'This is required.' }}
              render={({ field }) => (
                <Textarea label="Job Description" {...field} />
              )}
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
