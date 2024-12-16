type Props = {
  onFilter: (filter: Filter) => void;
};

export const SideBar = (props: Props) => (
  <select
    name="filter"
    defaultValue="all"
    onChange={(e) => props.onFilter(e.target.value as Filter)}
  >
    <option value="all">全てのタスク</option>
    <option value="checked">完了したタスク</option>
    <option value="unchecked">現在のタスク</option>
    <option value="removed">ごみ箱</option>
  </select>
);
