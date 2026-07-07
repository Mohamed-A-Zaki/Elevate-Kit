import {
  Box,
  Button,
  Group,
  Popover,
  ScrollArea,
  Text,
  TextInput,
  UnstyledButton,
  type TextInputProps,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import PhoneInput, {
  getCountryCallingCode,
  type Country,
  type FlagProps,
  type Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

/**
 * MantinePhoneInput
 * - Combines Mantine styling with react-phone-number-input functionality.
 */

type MantinePhoneInputProps = Omit<TextInputProps, "onChange" | "value"> & {
  value?: Value;
  onChange?: (value?: Value) => void;
  defaultCountry?: Country;
  countries?: Country[];
  labels?: Record<string, string>;
  international?: boolean;
  withCountryCallingCode?: boolean;
};

const MantinePhoneInput: React.FC<MantinePhoneInputProps> = ({
  value,
  onChange,
  defaultCountry = "US",
  countries,
  labels,
  international = true,
  withCountryCallingCode = true,
  className,
  disabled,
  error,
  label,
  required,
  placeholder = "Enter phone number",
  ...props
}) => {
  const { ref, ...rest } = props as any;

  return (
    <Box className={className}>
      {label && (
        <Text fw={500} size="sm" mb={4}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Text>
      )}

      <PhoneInput
        className="flex"
        flagComponent={FlagComponent as any}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        numberInputProps={{
          className: "flex-1",
          disabled,
          placeholder,
        }}
        smartCaret={false}
        value={value}
        onChange={(val) => onChange?.(val)}
        defaultCountry={defaultCountry}
        countries={countries}
        labels={labels}
        international={international}
        withCountryCallingCode={withCountryCallingCode}
        {...rest}
      />

      {error && typeof error === "string" && (
        <Text size="xs" c="red" mt={4}>
          {error}
        </Text>
      )}
    </Box>
  );
};

/* -----------------------
   InputComponent
   ----------------------- */
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  }
>(({ className, disabled, placeholder, value, onChange, ...props }, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const oldValue = value || "";
    const countryCodeMatch = oldValue.match(/^\+\d+/);
    if (countryCodeMatch) {
      const countryCode = countryCodeMatch[0];
      if (!newValue.startsWith(countryCode)) {
        const withoutNewPrefix = newValue.replace(/^\+\d+\s*/, "");
        const restored = countryCode + " " + withoutNewPrefix;
        const synthetic = {
          ...e,
          target: { ...e.target, value: restored },
          currentTarget: { ...e.currentTarget, value: restored },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange?.(synthetic);
        return;
      }
    }
    onChange?.(e);
  };

  return (
    <TextInput
      variant="default"
      className={`${className || ""} flex-1`}
      ref={ref}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      styles={{
        input: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: 0,
        },
      }}
      {...(props as TextInputProps)}
    />
  );
});
InputComponent.displayName = "InputComponent";

/* -----------------------
   Country Select
   ----------------------- */
type CountryEntry = { label: string; value: Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value?: Country;
  options: CountryEntry[];
  onChange: (country: Country) => void;
  labels?: Record<string, string>;
};

const CountrySelect: React.FC<CountrySelectProps> = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  labels,
}) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [search, setSearch] = React.useState("");

  const filtered = countryList.filter((c) => {
    if (!c.value) return false;
    const labelText = labels?.[c.value] || c.label;
    return labelText.toLowerCase().includes(search.toLowerCase());
  });

  if (!selectedCountry) return null;

  return (
    <Popover
      opened={opened}
      onClose={close}
      width={320}
      position="bottom-start"
    >
      <Popover.Target>
        <Button
          variant="default"
          onClick={toggle}
          disabled={disabled}
          px="xs"
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          <Group gap={6}>
            <FlagComponent
              country={selectedCountry}
              countryName={selectedCountry}
            />
            <Text size="sm" fw={500}>
              +{getCountryCallingCode(selectedCountry)}
            </Text>
            <FaChevronDown size={16} />
          </Group>
        </Button>
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Box p="xs">
          <TextInput
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            size="sm"
          />
        </Box>
        <ScrollArea h={300}>
          {filtered.length === 0 && (
            <Text size="sm" c="dimmed" p="md" ta="center">
              No country found
            </Text>
          )}
          {filtered.map(({ value, label }) =>
            value ? (
              <CountrySelectOption
                key={value}
                country={value}
                countryName={labels?.[value] || label}
                selectedCountry={selectedCountry}
                onChange={onChange}
                onSelectComplete={close}
              />
            ) : null,
          )}
        </ScrollArea>
      </Popover.Dropdown>
    </Popover>
  );
};

/* -----------------------
   Country Option Row
   ----------------------- */
interface CountrySelectOptionProps extends FlagProps {
  selectedCountry: Country;
  onChange: (country: Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption: React.FC<CountrySelectOptionProps> = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  const isSelected = country === selectedCountry;

  return (
    <UnstyledButton
      onClick={handleSelect}
      style={{
        width: "100%",
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: isSelected ? "rgba(0, 123, 255, 0.06)" : "transparent",
        cursor: "pointer",
      }}
    >
      <FlagComponent country={country} countryName={countryName} />
      <Text size="sm" style={{ flex: 1 }}>
        {countryName}
      </Text>
      <Text size="sm" c="dimmed">
        +{getCountryCallingCode(country)}
      </Text>
      {isSelected && <FaCheck size={16} style={{ color: "green" }} />}
    </UnstyledButton>
  );
};

/* -----------------------
   Flag component
   ----------------------- */
const FlagComponent: React.FC<FlagProps> = ({ country, countryName }) => {
  if (!country) return null;
  const Flag = flags[country];
  return (
    <span
      style={{
        display: "inline-flex",
        height: 16,
        width: 24,
        overflow: "hidden",
        borderRadius: 2,
        flexShrink: 0,
      }}
    >
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { MantinePhoneInput };
