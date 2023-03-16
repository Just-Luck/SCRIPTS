const readline = require("readline"); //* Модуль для считывания данных из консоли
/*
Модуль readline предоставляет интерфейс для считывания данных из читаемого потока (такого как process.stdin) по одной строке за раз.
*/

const fs = require("fs"); //* Модуль файловой системы
/*
Модуль fs позволяет взаимодействовать с файловой системой способом, смоделированным на основе стандартных функций POSIX.
*/

//*Шаблонная функция для считывания вводимых значений по заданному запросу
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}
/*
При использовании `askQuestion` программа и будет ждать, пока пользователь введет ответ. Как только пользователь введет свой ответ, значение передано в код программы.
*/

//*Функция проверяет что бы строка состояла только из цифр, используя regex
function isPositiveNumber(str) {
  return /^[0-9]*$/i.test(str) && Number(str) == 0 ? false : true;
}
//!Позволяет отсеять дробные,отрицательные числа и ноль

let str = fs.readFileSync("input.txt", "utf8"); //* Чтение файла

var memory = {}; //* создание (массива данных)/(памяти)

//* Обработка входных данных
str = str.split(" "); //? Разделили весь файл по пробелам и преобразовали его в массив
//? ['retnE','100\nretnE','101\nfI','100','>','101\nnoitcartbuS','100','100','101\nfI','101' ... ]

str = str.toString().split("\n"); //? Преобразовали предыдущий массив в строку и разделили строчки между собой, а потом преобразовали его в массив
//? ['retnE,100','retnE,101','fI,100,>,101' ... ]

memory = str.toString().split(","); //? Преобразовали предыдущий массив в строку и разделили элементы каждой строки между собой, а потом записали их в нашу память (memory)
//? ['retnE','100','retnE','101','fI','100','>','101','noitcartbuS' ... ]

let i = 0; //* Используется как индекс для ориентирования в массиве(памяти)
let countNool = 0; //* Счетчик нулей

async function main() {
  while (memory[i] != "dnE") {
    switch (memory[i]) {
      case "retnE":
        memory[parseInt(memory[i + 1])] = await askQuestion(
          `Number #${i / 2 + 1} = `
        );
        //* Помещаем в память числа, от которых следует найти НОД
        //? memory[111] - Первое число | memory[112] - Второе число
        //parseInt - преобразует строку в число

        //*Проверяем формат числа функцией для проверки чисел
        if (!isPositiveNumber(memory[parseInt(memory[i + 1])])) {
          console.log(`ERROR: Number #${i / 2 + 1} - wrong format`);
          memory[i] = "dnE";
          break;
        }
        i += 2;
        break;
      case "tnI":
        //* Объявление переменной
        memory[parseInt(memory[i + 1])] = parseInt(memory[i + 2]);
        i += 3;
        break;
      case "tuptuO":
        //*Вывод в консоль
        console.log(`NOD = ${memory[parseInt(memory[i + 1])]}`);
        i += 2;
        break;
      case "pmuJ":
        //*Перейти к значению
        i = parseInt(memory[i + 1]);
        break;
      case "noitacilpitluM":
        //* Умножение
        memory[parseInt(memory[i + 1])] =
          memory[parseInt(memory[i + 2])] * memory[parseInt(memory[i + 3])];
        i += 4;
        break;
      case "noitiddA":
        //* Сложение
        memory[parseInt(memory[i + 1])] =
          memory[parseInt(memory[i + 2])] + parseInt(memory[i + 3]);
        i += 4;
        break;
      case "noitcartbuS":
        //* Вычитание
        memory[parseInt(memory[i + 1])] =
          memory[parseInt(memory[i + 2])] - memory[parseInt(memory[i + 3])];
        i += 4;
        break;
      case "fI":
        //* Условие
        code =
          parseInt(memory[parseInt(memory[i + 1])]) +
          memory[i + 2].toString() +
          parseInt(memory[parseInt(memory[i + 3])]);
        //* eval выполнение кода из строки
        if (eval(code)) {
          i += 4;
        } else {
          i += 6;
        }
        break;
      default:
        i++;
        break;
    }
  }
}
main();
