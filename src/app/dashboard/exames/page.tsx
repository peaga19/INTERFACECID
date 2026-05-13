"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FileText, Download } from "lucide-react";
import { jsPDF } from "jspdf";

const exames = [
  {
    id: 1,
    nome: "Hemograma Completo",
    lab: "Laboratório Central",
    data: "10/10/2023",
    resultados: [
      { item: "Hemácias", valor: "5.1 milhões/mm³", referencia: "4.5 - 6.0" },
      { item: "Hemoglobina", valor: "14.2 g/dL", referencia: "13.0 - 17.5" },
      { item: "Hematócrito", valor: "42%", referencia: "38 - 50%" },
      { item: "Leucócitos", valor: "7.200/mm³", referencia: "4.000 - 11.000" },
      { item: "Plaquetas", valor: "250.000/mm³", referencia: "150.000 - 400.000" },
      { item: "VCM", valor: "88 fL", referencia: "80 - 100 fL" },
      { item: "HCM", valor: "28 pg", referencia: "27 - 33 pg" },
    ],
  },
  {
    id: 2,
    nome: "Glicemia em Jejum",
    lab: "Laboratório São Lucas",
    data: "10/10/2023",
    resultados: [
      { item: "Glicose", valor: "92 mg/dL", referencia: "70 - 99 mg/dL" },
    ],
  },
];

function gerarPDF(exame: (typeof exames)[0]) {
  const doc = new jsPDF();
  const azulSUS = [0, 86, 179];
  const cinzaEscuro = [15, 23, 42];

  // Header
  doc.setFillColor(azulSUS[0], azulSUS[1], azulSUS[2]);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Meu SUS Digital", 15, 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Sistema Único de Saúde - Resultado de Exame", 15, 28);

  // Info do paciente
  doc.setTextColor(cinzaEscuro[0], cinzaEscuro[1], cinzaEscuro[2]);
  doc.setFontSize(10);
  let y = 52;
  doc.setFont("helvetica", "bold");
  doc.text("Paciente:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text("Paulo da Silva", 42, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("CNS:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text("701 2345 6789 0000", 42, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Data:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text(exame.data, 42, y);

  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Laboratório:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.text(exame.lab, 42, y);

  // Linha separadora
  y += 10;
  doc.setDrawColor(azulSUS[0], azulSUS[1], azulSUS[2]);
  doc.setLineWidth(0.5);
  doc.line(15, y, 195, y);

  // Titulo do exame
  y += 12;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(azulSUS[0], azulSUS[1], azulSUS[2]);
  doc.text(exame.nome, 15, y);

  // Cabeçalho da tabela
  y += 12;
  doc.setFillColor(240, 245, 250);
  doc.rect(15, y - 5, 180, 8, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(cinzaEscuro[0], cinzaEscuro[1], cinzaEscuro[2]);
  doc.text("Exame", 18, y);
  doc.text("Resultado", 90, y);
  doc.text("Referência", 140, y);

  // Linhas da tabela
  doc.setFont("helvetica", "normal");
  exame.resultados.forEach((r) => {
    y += 9;
    doc.setTextColor(cinzaEscuro[0], cinzaEscuro[1], cinzaEscuro[2]);
    doc.text(r.item, 18, y);
    doc.setFont("helvetica", "bold");
    doc.text(r.valor, 90, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(r.referencia, 140, y);

    // linha fina
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(15, y + 3, 195, y + 3);
  });

  // Rodapé
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Este documento foi gerado eletronicamente pelo sistema Meu SUS Digital e possui validade legal.",
    15,
    pageHeight - 20
  );
  doc.text(
    `Gerado em: ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
    15,
    pageHeight - 14
  );

  doc.save(`resultado_${exame.nome.toLowerCase().replace(/\s+/g, "_")}.pdf`);
}

export default function ExamesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-sus-foreground tracking-tight">
          Meus Exames
        </h1>
        <p className="text-sus-muted text-lg mt-1">
          Resultados de exames laboratoriais e de imagem.
        </p>
      </header>

      <div className="grid gap-4 mt-8">
        {exames.map((exame) => (
          <Card key={exame.id}>
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-500/10 p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{exame.nome}</h3>
                  <p className="text-sus-muted text-sm mt-1">
                    {exame.lab} • {exame.data}
                  </p>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => gerarPDF(exame)}
                >
                  <Download className="w-4 h-4 mr-2" /> PDF do Resultado
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
