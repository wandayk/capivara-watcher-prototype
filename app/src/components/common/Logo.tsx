interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-sm", container: "gap-2" },
    md: { icon: "w-15 h-15", text: "text-2xl", container: "gap-3" },
    lg: { icon: "w-12 h-12", text: "text-3xl", container: "gap-4" },
  };

  const sizeClasses = sizes[size];

  return (
    <div className={`flex items-center ${sizeClasses.container}`}>
      <img
        src="/capivara.svg"
        alt="Capivara Watcher Logo"
        className={sizeClasses.icon}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizeClasses.text} font-display font-bold`}>
            CAPIVARA
          </span>
          <span className={`${sizeClasses.text} font-display font-bold`}>
            WATCHER
          </span>
        </div>
      )}
    </div>
  );
}
