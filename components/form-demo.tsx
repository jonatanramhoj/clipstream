import { useState } from "react";

export function FormDemo() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  // const handleChange =
  //   (field: keyof typeof formState) =>
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormState({
  //       ...formState,
  //       [field]: e.target.value,
  //     });
  //   };

  const handleChange = (
    field: keyof typeof formState,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      <input type="text" onChange={(e) => handleChange("email", e)} />
    </div>
  );
}
