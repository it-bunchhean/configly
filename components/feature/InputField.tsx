"use client";

import {
  startTransition,
  useState,
  useRef,
  useCallback,
  useEffect,
  type FC,
} from "react";
import {
  ChevronDown,
  Copy,
  Trash,
  Check,
  Download,
  ArrowRightLeft,
  AlertCircle,
} from "lucide-react";
import { convertFormat, type FormatLanguage } from "@/lib/converter";

const LANGUAGES: FormatLanguage[] = [
  "Property",
  "Yaml",
  "Xml",
  "Json",
  "Toml",
  "Env",
];

const SAMPLE_PROPERTIES = `# Server Configuration
server.port=8080
server.host=127.0.0.1
server.servlet.context-path=/api/v1

# Database Settings
spring.datasource.url=jdbc:postgresql://localhost:5432/converter_db
spring.datasource.username=dbadmin
spring.datasource.password=secret_password
spring.datasource.hikari.maximum-pool-size=10
`;

const SAMPLE_INPUTS: Record<FormatLanguage, string> = {
  Property: SAMPLE_PROPERTIES,
  Yaml: `server:
  port: 8080
  host: 127.0.0.1
spring:
  application:
    name: converter-service`,
  Xml: `<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <server>
    <port>8080</port>
    <host>127.0.0.1</host>
  </server>
</configuration>`,
  Json: `{
  "server": {
    "port": 8080,
    "host": "127.0.0.1"
  },
  "environment": "development"
}`,
  Toml: `[server]
port = 8080
host = "127.0.0.1"

[spring.application]
name = "converter-service"`,
  Env: `SERVER_PORT=8080
SERVER_HOST=127.0.0.1
SPRING_APPLICATION_NAME=converter-service`,
};

interface CursorPosition {
  line: number;
  col: number;
}

interface InputFieldProps {
  initialFrom?: FormatLanguage;
  initialTo?: FormatLanguage;
}

const InputField: FC<InputFieldProps> = ({
  initialFrom = "Property",
  initialTo = "Yaml",
}) => {
  const [inputCode, setInputCode] = useState<string>(
    SAMPLE_INPUTS[initialFrom],
  );
  const [outputCode, setOutputCode] = useState<string>("");
  const [fromLang, setFromLang] = useState<FormatLanguage>(initialFrom);
  const [toLang, setToLang] = useState<FormatLanguage>(initialTo);
  const [fromLangOpen, setFromLangOpen] = useState<boolean>(false);
  const [toLangOpen, setToLangOpen] = useState<boolean>(false);

  const [inputCursor, setInputCursor] = useState<CursorPosition>({
    line: 1,
    col: 1,
  });
  const [outputCursor, setOutputCursor] = useState<CursorPosition>({
    line: 1,
    col: 1,
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const inputTextareaRef = useRef<HTMLTextAreaElement>(null);
  const outputTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedFrom = params.get("from") as FormatLanguage | null;
    const requestedTo = params.get("to") as FormatLanguage | null;

    startTransition(() => {
      if (requestedFrom && LANGUAGES.includes(requestedFrom)) {
        setFromLang(requestedFrom);
        setInputCode(SAMPLE_INPUTS[requestedFrom]);
      }
      if (requestedTo && LANGUAGES.includes(requestedTo)) {
        setToLang(requestedTo);
      }
    });
  }, []);

  // Perform format conversion whenever inputCode, fromLang, or toLang changes
  useEffect(() => {
    if (!inputCode.trim()) {
      setOutputCode(" ");
      setErrorMsg(null);
      return;
    }

    const { success, result, error } = convertFormat(
      inputCode,
      fromLang,
      toLang,
    );
    if (success) {
      setOutputCode(result);
      setErrorMsg(null);
    } else {
      setErrorMsg(error || "Conversion error");
    }
  }, [inputCode, fromLang, toLang]);

  const updateCursorPosition = useCallback(
    (
      ref: React.RefObject<HTMLTextAreaElement | null>,
      setCursor: (pos: CursorPosition) => void,
    ) => {
      const el = ref.current;
      if (!el) return;
      const pos = el.selectionStart;
      const before = el.value.slice(0, pos);
      const lines = before.split("\n");
      setCursor({
        line: lines.length,
        col: lines[lines.length - 1].length + 1,
      });
    },
    [],
  );

  const handleCopyOutput = async () => {
    if (!outputCode) return;
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = outputCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!outputCode) return;
    const extMap: Record<FormatLanguage, string> = {
      Property: "properties",
      Yaml: "yaml",
      Xml: "xml",
      Json: "json",
      Toml: "toml",
      Env: "env",
    };
    const blob = new Blob([outputCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `config.${extMap[toLang]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSwapLanguages = () => {
    const prevFrom = fromLang;
    const prevTo = toLang;
    setFromLang(prevTo);
    setToLang(prevFrom);
    if (outputCode) {
      setInputCode(outputCode);
    }
  };

  const handleLoadSample = () => {
    switch (fromLang) {
      case "Property":
        setInputCode(SAMPLE_PROPERTIES);
        break;
      case "Yaml":
        setInputCode(
          `server:\n  port: 8080\n  host: 127.0.0.1\n  servlet:\n    context-path: /api/v1\nspring:\n  application:\n    name: converter-service\n  profiles:\n    active: development`,
        );
        break;
      case "Xml":
        setInputCode(
          `<?xml version="1.0" encoding="UTF-8"?>\n<configuration>\n  <server>\n    <port>8080</port>\n    <host>127.0.0.1</host>\n  </server>\n  <spring>\n    <application>\n      <name>converter-service</name>\n    </application>\n  </spring>\n</configuration>`,
        );
        break;
      case "Json":
        setInputCode(
          JSON.stringify(
            {
              server: {
                port: 8080,
                host: "127.0.0.1",
                servlet: { "context-path": "/api/v1" },
              },
              spring: {
                application: { name: "converter-service" },
                profiles: { active: "development" },
              },
            },
            null,
            2,
          ),
        );
        break;
      case "Toml":
        setInputCode(
          `[server]\nport = 8080\nhost = "127.0.0.1"\n\n[server.servlet]\ncontext-path = "/api/v1"\n\n[spring.application]\nname = "converter-service"`,
        );
        break;
      case "Env":
        setInputCode(
          `SERVER_PORT=8080\nSERVER_HOST=127.0.0.1\nSERVER_SERVLET_CONTEXT_PATH=/api/v1\nSPRING_APPLICATION_NAME=converter-service\nSPRING_PROFILES_ACTIVE=development`,
        );
        break;
    }
  };

  const inputLineCount = Math.max(inputCode.split("\n").length, 1);
  const outputLineCount = Math.max(outputCode.split("\n").length, 1);

  return (
    <section className="w-full h-full min-w-0">
      {/* Top action bar */}
      <div className="mb-3 flex w-full min-w-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={handleSwapLanguages}
            className="flex max-w-full items-center gap-1.5 bg-stone-100 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-stone-200"
            title="Swap source and target languages"
          >
            <ArrowRightLeft size={14} className="shrink-0" />
            <span className="truncate">
              Swap ({fromLang} - {toLang})
            </span>
          </button>
        </div>

        {errorMsg && (
          <div className="flex max-w-full items-start gap-1.5 rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span className="break-words">{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Editors Container */}
      <div className="relative flex w-full min-w-0 flex-col gap-4 overflow-hidden bg-white lg:flex-row lg:gap-0">
        <div className="flex h-[360px] min-h-[500px] min-w-0 flex-1 shrink-0 flex-col overflow-hidden border bg-white text-primary sm:h-[400px] sm:min-h-[400px] md:h-[500px] md:min-h-[500px] lg:h-[580px] lg:min-h-[580px] lg:shrink lg:border-r-0">
          {/* Input Toolbar */}
          <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 border-b px-3 py-2 text-sm text-primary">
            {/* Source language */}
            <div className="flex min-w-0 items-center gap-2">
              <span className="mr-1 shrink-0 text-sm text-primary/75">
                Source:
              </span>

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setFromLangOpen((o) => !o);
                    setToLangOpen(false);
                  }}
                  className="flex items-center gap-1 bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  {fromLang}

                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      fromLangOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {fromLangOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-36 overflow-hidden rounded border border-stone-200 bg-white py-1 shadow-lg">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          setFromLang(l);
                          setInputCode(SAMPLE_INPUTS[l]);
                          setFromLangOpen(false);
                        }}
                        className={`block w-full px-3 py-1.5 text-left text-xs text-primary hover:bg-stone-100 ${
                          fromLang === l ? "bg-stone-50 font-semibold" : ""
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Clear input */}
            <div className="flex shrink-0 items-center gap-3 text-primary/75">
              <button
                type="button"
                onClick={() => setInputCode("")}
                className="p-1 transition-colors hover:text-primary"
                title="Clear input"
              >
                <Trash size={15} />
              </button>
            </div>
          </div>

          {/* Input Textarea Area */}
          <div className="relative z-10 flex min-h-0 min-w-0 flex-1 overflow-hidden bg-white px-3">
            <textarea
              ref={inputTextareaRef}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              onKeyUp={() =>
                updateCursorPosition(inputTextareaRef, setInputCursor)
              }
              onClick={() =>
                updateCursorPosition(inputTextareaRef, setInputCursor)
              }
              onSelect={() =>
                updateCursorPosition(inputTextareaRef, setInputCursor)
              }
              spellCheck={false}
              wrap="soft"
              placeholder={SAMPLE_INPUTS[fromLang]}
              className="min-h-0 min-w-0 flex-1 resize-none border-none bg-transparent pt-3 pr-4 pb-3 font-mono text-sm leading-6 text-primary outline-none placeholder:text-stone-400"
            />
          </div>

          {/* Input Status Bar */}
          <div className="flex shrink-0 items-center justify-between border-t px-3 py-1.5 font-sans text-xs text-muted">
            <span>
              Ln {inputCursor.line}, Col {inputCursor.col}
            </span>

            <span>{inputLineCount} lines</span>
          </div>
        </div>

        <div className="flex h-[360px] min-h-[500px] min-w-0 flex-1 shrink-0 flex-col overflow-hidden border bg-white text-primary sm:h-[400px] sm:min-h-[400px] md:h-[500px] md:min-h-[500px] lg:h-[580px] lg:min-h-[580px] lg:shrink lg:border-r">
          {/* Output Toolbar */}
          <div className="flex min-w-0 shrink-0 items-center justify-between gap-2 border-b bg-white px-3 py-2 text-sm text-primary">
            {/* Target language */}
            <div className="flex min-w-0 items-center gap-2">
              <span className="mr-1 shrink-0 text-sm text-primary/75">
                Target:
              </span>

              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setToLangOpen((o) => !o);
                    setFromLangOpen(false);
                  }}
                  className="flex items-center gap-1 bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  {toLang}

                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${
                      toLangOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {toLangOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-36 overflow-hidden rounded border border-stone-200 bg-white py-1 shadow-lg">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => {
                          setToLang(l);
                          setToLangOpen(false);
                        }}
                        className={`block w-full px-3 py-1.5 text-left text-xs text-primary hover:bg-stone-100 ${
                          toLang === l ? "bg-stone-100 font-semibold" : ""
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Output actions */}
            <div className="flex shrink-0 items-center gap-2 text-primary/75 sm:gap-3">
              {/* Copy */}
              <button
                type="button"
                onClick={handleCopyOutput}
                disabled={!outputCode}
                className="flex items-center gap-1 p-1 transition-colors hover:text-primary disabled:opacity-40"
                title="Copy to clipboard"
              >
                {copied ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <Check size={14} />
                    <span className="hidden sm:inline">Copied!</span>
                  </span>
                ) : (
                  <Copy size={15} />
                )}
              </button>

              {/* Download */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={!outputCode}
                className="p-1 transition-colors hover:text-primary disabled:opacity-40"
                title="Download formatted file"
              >
                <Download size={15} />
              </button>
            </div>
          </div>

          {/* Output Textarea Area */}
          <div className="relative z-10 flex min-h-0 min-w-0 flex-1 overflow-hidden bg-white px-3">
            <textarea
              ref={outputTextareaRef}
              value={outputCode}
              readOnly
              onKeyUp={() =>
                updateCursorPosition(outputTextareaRef, setOutputCursor)
              }
              onClick={() =>
                updateCursorPosition(outputTextareaRef, setOutputCursor)
              }
              onSelect={() =>
                updateCursorPosition(outputTextareaRef, setOutputCursor)
              }
              wrap="soft"
              placeholder={`Converted ${toLang} output will appear here...`}
              className="min-h-0 min-w-0 flex-1 resize-none border-none bg-transparent pt-3 pr-4 pb-3 font-mono text-sm leading-6 text-primary outline-none placeholder:text-stone-400"
            />
          </div>

          {/* Output Status Bar */}
          <div className="flex shrink-0 items-center justify-between border-t border-stone-200 bg-white px-3 py-1.5 font-sans text-xs text-muted">
            <span>
              Ln {outputCursor.line}, Col {outputCursor.col}
            </span>

            <span>{outputLineCount} lines</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default InputField;
