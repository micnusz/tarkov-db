"use client";

import formatExperience from "@/components/modules/experience-format";

type Props = {
  experience: number;
};

export const ExperienceReward = ({ experience }: Props) => {
  return (
    <>
      {/* EXP Reward */}
      {experience > 0 && (
        <li className="text-sm md:text-base">
          • +{formatExperience(experience)}.
        </li>
      )}
    </>
  );
};

export default ExperienceReward;
