import { filterLabel } from "../utils";

type Props = {
  onFilter: (filter: Filter) => void;
};

export const SideBar = (props: Props) => (
  <select
    name="filter"
    defaultValue="all"
    onChange={(e) => props.onFilter(e.target.value as Filter)}
  >
    <option value="all">{filterLabel.all}</option>
    <option value="checked">{filterLabel.checked}</option>
    <option value="unchecked">{filterLabel.unchecked}</option>
    <option value="removed">{filterLabel.removed}</option>
  </select>
);
