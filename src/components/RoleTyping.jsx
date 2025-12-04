import { TypeAnimation } from "react-type-animation";

export default function RoleTyping() {
  return (
    <div className="flex gap-2 items-center">
      <TypeAnimation
        sequence={[
          "Software Developer", // type
          1000, // wait 2s
          "", // delete
          "UI/UX Designer", // type new
          1000, // wait 2s
          "", // delete again and loop
        ]}
        wrapper="span"
        speed={50}
        deletionSpeed={30}
        repeat={Infinity}
        className="font-zain italic font-medium text-primary text-base md:text-lg lg:text-3xl dark:text-[var(--hacker-neon-blue)]
dark:drop-shadow-[0_0_6px_var(--hacker-neon-blue)]"
      />
    </div>
  );
}
