import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
interface IBudgetForm {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  budget: any;
  setBudget: React.Dispatch<React.SetStateAction<any>>;
}
export const BudgetForm = ({
  formStep,
  setFormStep,
  budget,
  setBudget,
}: IBudgetForm) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm({
    defaultValues: budget,
    mode: 'all',
  });

  const onSubmit = (data: any) => {
    if (isDirty) {
      setBudget(data);
    }
    setFormStep((prev) => prev + 1);
  };

  return (
    <section
      className={`h-full flex flex-col justify-between ${
        formStep === 2 ? 'block' : 'hidden'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full justify-between"
      >
        <div>
          <h2>Monthly budget</h2>
          <small>
            $4,900.00 USD is the avarage budget for Part-Time (20h) jobs with
            similar skills
          </small>
          <div className="flex justify-between gap-10 flex-wrap">
            <div className="flex flex-col flex-grow">
              <label htmlFor="job_details">Minimun budget (USD)</label>
              <input
                className="border border-gray-600 app-input"
                type="number"
                {...register('min_budget', {
                  required: 'This field is required',
                })}
              />
              <ErrorMessage
                as={'span'}
                className={'text-red-400 text-xs'}
                errors={errors}
                name="min_budget"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="job_details">Max budget (USD)</label>
              <input
                className="border border-gray-600 app-input"
                type="number"
                {...register('max_budget', {
                  required: 'This field is required',
                })}
              />
              <ErrorMessage
                as={'span'}
                className={'text-red-400 text-xs'}
                errors={errors}
                name="max_budget"
              />
            </div>
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
            Post Job & View Talent
          </Button>
        </div>
      </form>
    </section>
  );
};
