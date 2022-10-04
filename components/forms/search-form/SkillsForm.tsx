import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { skillsMock } from '../../../lib/mocks/skills.mock';
interface ISkillForm {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SkillsForm = ({
  formStep,
  skills,
  setSkills,
  setFormStep,
}: ISkillForm) => {
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
    <section
      className={`h-full flex flex-col justify-between ${
        formStep === 0 ? 'block' : 'hidden'
      }`}
    >
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Skills for this role</h2>
        <div>
          <select
            onChange={(e) => addSkillToSelected(e.target.value)}
            id="skills"
            className={`border border-gray-600 capitalize px-2 py-2 w-full outline-none ${
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
              className="bg-white border border-app-black text-app-black  capitalize px-2 py-1 rounded-md transition-all hover:shadow-sm cursor-pointer"
              key={index}
            >
              {skill} +
            </span>
          ))}
        </div>
        <div>
          <div
            className={`min-h-[200px] bg-app-skyblue  mt-8 w-full p-8 ${
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
                    className="bg-app-black text-white text-xs flex relative capitalize px-5 py-1 rounded-md transition-all hover:shadow-sm cursor-pointer"
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
      <div className="py-6 text-right">
        <Button
          className="bg-app-blue"
          color="blue-gray"
          onClick={() => setFormStep((prev) => prev + 1)}
          disabled={skills.length === 0}
        >
          Next Step
        </Button>
      </div>
    </section>
  );
};
