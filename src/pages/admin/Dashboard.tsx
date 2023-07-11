/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "../../styles/Dashboard.module.css";
import { BiExit, BiSolidDashboard } from "react-icons/bi";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  optionsProvider,
  optionsSoles,
  optionsUnity,
} from "../../utils/optionsSoles";
import useDashboard from "../../hook/useDashboard";
import * as XLSX from "xlsx";

ChartJS.register(
  CategoryScale,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [number1, setNumber1] = useState<number>(0);
  const [number2, setNumber2] = useState<number>(0);
  const [dataGrap1, setDataGrap1] = useState<number[]>([]);
  const [dataGrap2, setDataGrap2] = useState<number[]>([]);
  const [dataGrap3, setDataGrap3] = useState<number[]>([]);
  const [dataGrap4, setDataGrap4] = useState<number[]>([]);
  const [dataExcel, setDataExcel] = useState<any[]>([]);

  const {
    getDataNumber1,
    getDataNumber2,
    getDataGraph1,
    getDataGraph2,
    getDataGraph3,
    getDataGraph4,
    generateExcelDB,
  } = useDashboard();

  const labels = ["Barra De Construccion", "Cemento", "Alambre", "Tuberia PVC"];

  const labels2 = [
    "Matusita",
    "Acero Mexicano",
    "Cemento Sol",
    "Cemento Andino",
    "Aragcu Peru",
    "Inkaferro",
    "Belgo 60",
    "Cemento Apu",
    "Aceros Arequipa ",
  ];

  const labels3 = [
    "CRUCES LEONARDO HUAMAN",
    "CHAQUILA MUNOZ SEBASTIAN JESUS",
    "YACTAYO CRISOSTOMO SEBASTIAN ARON",
    "JIMENES CAHUANA STEFANY",
    "HENRY GOMES",
    "JOSE CASTILLO",
    "FRANK CABANILLAS",
  ];

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Ingresos",
        data: dataGrap1,
        backgroundColor: ["#364b59"],
        borderColor: ["#364b59"],
        borderWidth: 1,
      },
    ],
  });

  const [data2, setData2] = useState({
    labels: labels,
    datasets: [
      {
        label: "Unidades",
        data: dataGrap2,
        backgroundColor: ["#364b59"],
        borderColor: ["#364b59"],
        borderWidth: 1,
      },
    ],
  });

  const [data3, setData3] = useState({
    labels: labels2,
    datasets: [
      {
        label: "Ingresos por marca",
        data: dataGrap3,
        backgroundColor: ["#364b59"],
        borderColor: ["#364b59"],
        borderWidth: 1,
      },
    ],
  });

  const [data4, setData4] = useState({
    labels: labels3,
    datasets: [
      {
        label: "Compras anuales",
        data: dataGrap4.length > 0 && dataGrap4,
        backgroundColor: ["#364b59"],
        borderColor: ["#364b59"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    getDataGraps();
  }, []);

  const getDataGraps = async () => {
    const dataNumber1 = await getDataNumber1();
    const dataNumber2 = await getDataNumber2();
    const data1 = await getDataGraph1();
    const data2 = await getDataGraph2();
    const data3 = await getDataGraph3();
    const data4 = await getDataGraph4();
    setDataExcel(await generateExcelDB());
    const fullnameArray = data4.map((item: any) => item.fullname);

    const formattedData1 = labels.map((label) => {
      const item = data1.find(
        (item: any) => item.categoria.toLowerCase() === label.toLowerCase()
      );
      return item ? item.ingresos : 0;
    });

    const formattedData2 = labels.map((label) => {
      const item = data2.find(
        (item: any) => item.categoria.toLowerCase() === label.toLowerCase()
      );
      return item ? Number(item.cantidad_vendida) : 0;
    });

    const formattedData3 = labels2.map((label) => {
      const item = data3.find(
        (item: any) => item.marca.toLowerCase() === label.toLowerCase()
      );
      return item ? item.ingresos : 0;
    });

    const labelsNames = fullnameArray;

    const formattedData4 = labelsNames.map((label: any) => {
      const item = data4.find(
        (item: any) => item.fullname.toLowerCase() === label.toLowerCase()
      );
      return item ? item.ingresos : 0;
    });
    setDataGrap1(formattedData1);
    setDataGrap2(formattedData2);
    setDataGrap3(formattedData3);
    setDataGrap4(formattedData4);
    setNumber1(dataNumber1[0].total);
    setNumber2(dataNumber2[0].cantidad);

    if (formattedData1.length > 0) {
      setData({
        labels: labels,
        datasets: [
          {
            label: "Ingresos",
            data: formattedData1,
            backgroundColor: ["#364b59"],
            borderColor: ["#364b59"],
            borderWidth: 1,
          },
        ],
      });

      setData2({
        labels: labels,
        datasets: [
          {
            label: "Unidades",
            data: formattedData2,
            backgroundColor: ["#364b59"],
            borderColor: ["#364b59"],
            borderWidth: 1,
          },
        ],
      });

      setData3({
        labels: labels2,
        datasets: [
          {
            label: "Ingresos por marca",
            data: formattedData3,
            backgroundColor: ["#364b59"],
            borderColor: ["#364b59"],
            borderWidth: 1,
          },
        ],
      });

      setData4({
        labels: fullnameArray,
        datasets: [
          {
            label: "Compras anuales",
            data: formattedData4,
            backgroundColor: ["#364b59"],
            borderColor: ["#364b59"],
            borderWidth: 1,
          },
        ],
      });
    }
  };

  // EXCEL
  const generateExcel = () => {
    // Crear una hoja de trabajo de Excel
    const workbook = XLSX.utils.book_new();
    // change name workbook
    // Crear una hoja de cálculo
    const worksheet = XLSX.utils.json_to_sheet([]);

    // Crear una matriz para los valores de productos y precios
    const rowData = [
      [
        "idOrder",
        "idUser",
        "fullname",
        "purchase_date",
        "category",
        "idProduct",
        "product",
        "product_brand",
        "quantity",
        "unit_price",
        "total",
      ], // Encabezados
      ...dataExcel.map((item) => [
        item.idOrder,
        item.idUser,
        item.fullname,
        item.purchase_date,
        item.category,
        item.idProduct,
        item.product,
        item.product_brand,
        item.quantity,
        item.unit_price.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
        }),
        item.total.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
          minimumFractionDigits: 2,
        }),
      ]), // Datos
    ];

    // Calcular la posición inicial de los valores
    const startRow = worksheet["!ref"]
      ? XLSX.utils.decode_range(worksheet["!ref"]).e.r
      : 0;
    const startColumn = worksheet["!ref"]
      ? XLSX.utils.decode_range(worksheet["!ref"]).s.c
      : 0;

    // Agregar los valores a la hoja de cálculo
    rowData.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        const cell = XLSX.utils.encode_cell({
          r: startRow + rowIndex,
          c: startColumn + columnIndex,
        });

        worksheet[cell] = { v: value };
      });
    });

    // Actualizar el rango de celdas
    const endRow = startRow + rowData.length - 1;
    const endColumn = startColumn + rowData[0].length - 1;
    worksheet["!ref"] = XLSX.utils.encode_range({
      s: { r: startRow, c: startColumn },
      e: { r: endRow, c: endColumn },
    });

    const columnWidths = rowData[0].map((_, columnIndex) => {
      const columnData = rowData.map((row) => row[columnIndex]);
      const maxLength = columnData.reduce(
        (max, current) =>
          current.toString().length > max ? current.toString().length : max,
        0
      );
      return maxLength;
    });
    // Ajustar el ancho de las columnas en la hoja de cálculo
    worksheet["!cols"] = columnWidths.map((width) => ({ width }));

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte trefisa");

    // Generar el archivo Excel en formato de datos binarios
    const excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Convertir los datos binarios a un blob
    const blob = new Blob([excelData], { type: "application/octet-stream" });

    // Descargar el archivo Excel
    const fileName = "data.xlsx";
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <img src="/images/logo.png" alt="logo" />
        <div className={styles.links}>
          <Link to="/admin/dashboard" className={styles.link}>
            <BiSolidDashboard /> Dashboard
          </Link>
          <button onClick={generateExcel} className={styles.btnExcel}>Generar Excel</button>
        </div>
        <Link
          className={styles.button_exit}
          to="/auth/login"
          onClick={() => {
            localStorage.clear();
          }}
        >
          <BiExit />
          Salir
        </Link>
      </div>
      <div className={styles.content}>
        <h1>Dashboard</h1>
        <div className={styles.content_cards_number}>
          {number1 !== 0 && (
            <>
              <div className={styles.content_card_number}>
                <h3>Total de ventas</h3>
                <p>S/ {number1.toFixed(2)}</p>
              </div>
              <div className={styles.content_card_number}>
                <h3>Cantidad total de productos vendidos</h3>
                <p>{number2}</p>
              </div>
            </>
          )}
        </div>

        {/* Chartjs */}
        {dataGrap1.length > 0 ? (
          <>
            <div className={styles.charts}>
              <div className={styles.chart}>
                <Bar options={optionsSoles} data={data} />
              </div>
              <div className={styles.chart}>
                <Bar options={optionsUnity} data={data2} />
              </div>
              <div className={styles.chart}>
                <Bar options={optionsProvider} data={data3} />
              </div>
              <div className={styles.chart}>
                <Bar options={optionsProvider} data={data4} />
              </div>
            </div>
          </>
        ) : (
          <h1>Cargando datos</h1>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
