type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

/** Envoltura centrada con ancho máximo y padding horizontal responsivo. */
export default function Container({ className, children }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-6 sm:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}
