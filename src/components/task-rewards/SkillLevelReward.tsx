"use client";

type Props = {
  skillLevelReward: {
    level: number;
    name: string;
  }[];
};

export const SkillLevelReward = ({ skillLevelReward }: Props) => {
  return (
    <>
      {/* Skill level Reward */}
      {skillLevelReward?.length > 0 && (
        <>
          {skillLevelReward.map((skill) => (
            <li
              key={skill.name}
              className="text-sm md:text-base"
              aria-label={`Reward: ${skill.name} level ${skill.level}`}
            >
              • +{skill.level} {skill.name} skill level
            </li>
          ))}
        </>
      )}
    </>
  );
};

export default SkillLevelReward;
