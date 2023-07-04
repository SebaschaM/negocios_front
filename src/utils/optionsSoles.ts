import formatNumberToSoles from "./formatNumberToSoles";

export const optionsSoles = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "CANTIDAD DE INGRESO GENERADO POR CADA CATEGORIA DE PRODUCTO",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.parsed.y || 0;
          return formatNumberToSoles(value);
        },
      },
    },
  },
};

export const optionsUnity = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "UNIDADES VENDIDAS POR CADA CATEGORIA DE PRODUCTO",
    },
  },
};

export const optionsProvider = {
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "CANTIDAD DE INGRESO GENERADO POR CADA MARCA DE PRODUCTO",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const value = context.parsed.y || 0;
          return formatNumberToSoles(value);
        },
      },
    },
  },
};
