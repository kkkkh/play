'use client'
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Alert 类型
type AlertType = "success" | "error" | "info" | "warning";

interface Alert {
  id: number;
  message: string;
  type: AlertType;
}

// Context 类型
interface AlertContextType {
  show: (message: string, type?: AlertType, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const show = useCallback(
    (message: string, type: AlertType = "info", duration: number = 3000) => {
      const id = Date.now(); // 唯一 id
      setAlerts((prev) => [...prev, { id, message, type }]);

      // 自动移除
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, duration);
    },
    []
  );

  const remove = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <>
    <h2>AlertProvider</h2>
    <AlertContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert ${
              alert.type === "success"
                ? "alert-success"
                : alert.type === "error"
                ? "alert-error"
                : alert.type === "warning"
                ? "alert-warning"
                : "alert-info"
            }`}
          >
            <span>{alert.message}</span>
            <button
              className="btn btn-sm btn-ghost ml-2"
              onClick={() => remove(alert.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
    </>
  );
};


export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert 必须在 AlertProvider 内使用");
  }
  return context;
};
