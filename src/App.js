
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

const questions = [
  // (Soal-soal disingkat agar tidak terlalu panjang di sini. Akan dilengkapi di akhir)
];

export default function PretestApp() {
  const [name, setName] = useState("");
  const [kelas, setKelas] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[current] = index;
    setAnswers(newAnswers);
    if (current < questions.length - 1) setCurrent(current + 1);
    else finishTest(newAnswers);
  };

  const finishTest = (finalAnswers) => {
    const total = questions.reduce(
      (acc, q, i) => acc + (q.answer === finalAnswers[i] ? 1 : 0),
      0
    );
    setScore(total);
  };

  const downloadResult = () => {
    const doc = new jsPDF();
    doc.text(`Nama: ${name}`, 10, 10);
    doc.text(`Kelas: ${kelas}`, 10, 20);
    doc.text(`Nilai: ${score} / ${questions.length}`, 10, 30);
    doc.save(`Hasil_Ujian_${name}.pdf`);
  };

  if (!name || !kelas)
    return (
      <div className="p-4 max-w-md mx-auto">
        <Card>
          <CardContent className="p-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">PRETEST REMEDIAL KELAS 4.A</h2>
            <Input placeholder="Nama" onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Kelas" onChange={(e) => setKelas(e.target.value)} />
          </CardContent>
        </Card>
      </div>
    );

  if (score !== null)
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Hasil Ujian</h2>
        <p>Nama: {name}</p>
        <p>Kelas: {kelas}</p>
        <p className="text-xl font-semibold my-2">
          Nilai: {score} / {questions.length}
        </p>
        <Button onClick={downloadResult} className="mt-4">
          <Download className="mr-2" /> Unduh Hasil
        </Button>
      </div>
    );

  const q = questions[current];

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">
            Soal {current + 1} dari {questions.length}
          </h2>
          <p className="mb-4">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, idx) => (
              <Button key={idx} onClick={() => handleAnswer(idx)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
