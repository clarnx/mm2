import { ErrorMessage } from '@hookform/error-message';
import { Button, Input } from '@material-tailwind/react';
import { Controller, useForm } from 'react-hook-form';
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
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm({
    defaultValues: budget || {
      min_budget: '',
      max_budget: '',
    },
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
          <div className="flex justify-between gap-10 flex-wrap pt-4">
            <div className="flex flex-col flex-grow">
              <Controller
                name="min_budget"
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field }) => (
                  <Input
                    type={'number'}
                    label="Minimun budget (USD)"
                    {...field}
                  />
                )}
              />
              <ErrorMessage
                as={'span'}
                className={'text-red-400 text-xs'}
                errors={errors}
                name="min_budget"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <Controller
                name="max_budget"
                control={control}
                rules={{ required: 'This is required.' }}
                render={({ field }) => (
                  <Input
                    type={'number'}
                    label="Minimun budget (USD)"
                    {...field}
                  />
                )}
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
