import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  values,
  onValuesChange,
  placeholder = "Add items...",
  className
}: MultiSelectProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !values.includes(trimmedValue)) {
        onValuesChange([...values, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const removeValue = (valueToRemove: string) => {
    onValuesChange(values.filter(value => value !== valueToRemove));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <Badge key={value} variant="secondary" className="flex items-center gap-1">
              {value}
              <X
                className="w-3 h-3 cursor-pointer hover:text-destructive"
                onClick={() => removeValue(value)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}