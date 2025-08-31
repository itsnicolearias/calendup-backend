export const GenerateAppCode = (lastName: string) => {
     // Prefijo: primeras 3 letras del apellido
  const lastNamePrefix = lastName
    ? lastName.substring(0, 3).toUpperCase()
    : "USR";

  // Número aleatorio de 5 dígitos
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  // Código final
  const appointmentCode = `${lastNamePrefix}-${randomNumber}`;
  return appointmentCode;
}