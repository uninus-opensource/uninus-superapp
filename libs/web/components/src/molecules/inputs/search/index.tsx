import { FC, ReactElement } from "react";
import { SearchProps } from "./types";
import IconSearch from "./ic-search";

export const SearchInput: FC<SearchProps> = ({ onChange, value, placeholder }): ReactElement => {
  return (
    <form>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          role="search"
          onChange={onChange}
          id="default-search"
          className="block lg:w-30% w-80% p-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder={placeholder}
          required
        />
        <div className="absolute inset-y-0 right-4 pr-4 flex items-center pl-3 pointer-events-none">
          <IconSearch />
        </div>
      </div>
    </form>
  );
};
export default SearchInput;
