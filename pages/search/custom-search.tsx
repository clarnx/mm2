import { Button } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { BudgetForm } from '../../components/forms/search-form/BudgetForm';
import { JobDetails } from '../../components/forms/search-form/JobDetails';
import { SkillsForm } from '../../components/forms/search-form/SkillsForm';
import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from '../page';

const CustomSearchPage: NextPageWithLayout = () => {
  const MAX_STEPS = 3;
  const [formStep, setFormStep] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [budget, setBudget] = useState<any>(null);

  useEffect(() => {
    if (formStep === MAX_STEPS) {
      console.log({ skills, jobDetails, budget });
    }
  }, [formStep]);

  return (
    <div className="min-h-[80vh] max-h-[80vh] gap-8 flex">
      <div
        style={{
          backgroundImage: "url('/banner-search.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-y ',
        }}
        className=" bg-app-black rounded-md min-w-[300px] hidden md:block"
      ></div>
      <div className="flex flex-col justify-between flex-grow">
        {formStep <= 0 && (
          <SkillsForm
            formStep={formStep}
            skills={skills}
            setSkills={setSkills}
            setFormStep={setFormStep}
          />
        )}
        {formStep <= 1 && (
          <JobDetails
            jobDetails={jobDetails}
            setJobDetails={setJobDetails}
            formStep={formStep}
            setFormStep={setFormStep}
          />
        )}

        {formStep <= 2 && (
          <BudgetForm
            formStep={formStep}
            setFormStep={setFormStep}
            budget={budget}
            setBudget={setBudget}
          />
        )}

        {formStep == MAX_STEPS && (
          <div>
            <p>List of candidates...</p>
            <Button
              variant="outlined"
              onClick={() => setFormStep((prev) => prev - 1)}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

CustomSearchPage.getLayout = (page) => {
  return <PrimaryLayout pageTitle="Custom Search">{page}</PrimaryLayout>;
};
export default CustomSearchPage;
