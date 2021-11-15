# Awsome Ciphering CLI Tool

## This is a CLI tool that encodes and decodes a text by 3 substitution ciphers:
* [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
* [Atbash cipher](https://en.wikipedia.org/wiki/Atbash)
* [ROT-8 as variation of ROT-13](https://en.wikipedia.org/wiki/ROT13)

CLI tool accept 3 options (short alias and full name):
1.  **-c, --config**: config for ciphers
Config is a string with pattern `{XY(-)}n`, where:
  * `X` is a cipher mark:
    * `C` is for Caesar cipher (with shift 1)
    * `A` is for Atbash cipher
    * `R` is for ROT-8 cipher
  * `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
    * `1` is for encoding
    * `0` is for decoding
2.  **-i, --input**: a path to input file
3.  **-o, --output**: a path to output file

For example, config `"C1-C1-R0-A"` means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

**Usage example:**  

```bash
$ node index -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`

```bash
$ node index -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`

```bash
$ node index -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`

```bash
$ node index -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`

# Self check
1. Task: https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/ciphering-cli-tool.md;
2. Date: November 14, 2021. Deadline: November 14, 2021
3. Score: 150/190

# Базовая реализация:
- В README.md должно быть описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению плюс (10 баллов);
- Если переданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются  (20 баллов);
- Приложение работает в соответствии с описанными в задании примерами (30 баллов);
- Если аргументы input и/или output ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным (10 баллов)
- Если любой из аргументов дублируется, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным (10 баллов);
- Если config невалиден или отсутствует, приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным (20 баллов);
- Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin (10 баллов);
- Если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout (10 баллов);
- Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются (20 баллов);
- Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст (0 баллов);
- Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.) (10 баллов);

Продвинутая реализация не выполнена :(
