import { Progressbar, Text } from 'rizzui';

export default function PercentWidget({
  value,
  percent,
  secondPercent,
}: {
  value: number | string;
  percent: number;
  secondPercent?: number;
}) {
  const color = percent >= 66 ? 'green' : percent <= 33 ? 'red' : 'orange';
  return (
    <>
      <Text className="pr-3 font-medium text-gray-700">{value}</Text>
      <Progressbar
        value={percent}
        color={percent >= 66 ? 'success' : percent <= 33 ? 'danger' : 'warning'}
        label={'gas used'}
        className={`h-1.5 w-24 bg-${color}-400`}
      />
      <Text className={`pt-1.5 text-[13px] text-${color}`}>
        {`${percent}%`}
        {secondPercent && (
          <span className="pt-1.5 text-[13px] text-gray-500">
            {` | ${secondPercent}%`}
          </span>
        )}
      </Text>
    </>
  );
}
