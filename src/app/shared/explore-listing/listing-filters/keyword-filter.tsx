import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { InitialStateType } from './filter-utils';

export default function KeywordFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  return (
    <div className="space-y-3">
      <Text tag="h6" className="mb-5 font-semibold">
        Keywords
      </Text>
      <Input
        value={state.keywords}
        type="text"
        placeholder="MLS #, yard, etc..."
        onChange={({ target }) => applyFilter('keywords', target.value)}
      />
    </div>
  );
}
