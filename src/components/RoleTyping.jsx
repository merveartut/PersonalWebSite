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
        className="font-zain text-3xl italic font-medium text-primary"
      />
    </div>
  );
}
