import React, {useCallback, useState} from "react";
import useDebounce from "@/hooks/useDebounce";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

type FilterProps = {
    setSearch: (value: string) => void;
}

export const FilterComponent: React.FC<FilterProps> = ({setSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const search = useCallback(() => {
            setSearch(searchTerm);
        }
        , [searchTerm, setSearch]);

    useDebounce({
        callback: search,
        delay: 1000,
        dependencies: [searchTerm]
    });

    return (
        <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                type="search"
                placeholder="Search for patients..."
                className="w-full rounded-lg border bg-background pl-8 pr-4 py-2 text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};