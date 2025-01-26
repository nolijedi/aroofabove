export interface DropdownItem {
  path: string;
  label: string;
}

export interface NavItem {
  path: string;
  label: string;
  dropdown?: DropdownItem[];
}