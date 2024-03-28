import { useState } from "react";
import { Control, UseFormSetValue, get, useController } from "react-hook-form";

type Props = {
  name: string;
  control?: Control<any, any>;
  setValue?: UseFormSetValue<any>;
};

const useControlledInput = ({ name, control, setValue }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field,
    formState: { isSubmitting, errors },
  } = useController({
    name,
    control,
  });
  const error = get(errors, name, "");
  const hasError = Boolean(error?.message);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return {
    hasError,
    field,
    isSubmitting,
    showPassword,
    setShowPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
  };
};

export default useControlledInput;
