import React, { useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Item from "../components/Item";
import { useSearchParams } from "react-router-dom";

const Listing = () => {
  const { properties, searchQuery, setSearchQuery } = useAppContext();
  const [selectedFilters, setSelectedFilters] = useState({
    propertyTypes: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");

  const [searchParams] = useSearchParams()
  const heroDestination = (searchParams.get("destination") || "").toLowerCase().trim()

  const sortOptions = ["relevant", "Low to High", "Hight to Low"];

  const propertyTypes = [
    "House",
    "Apartment",
    "Villa",
    "Penthouse",
    "Townhouse",
    "Commercial",
    "Land Plot",
  ];

  const priceRange = [
    "0 to 1000",
    "1000 to 2000",
    "2000 to 4000",
    "4000 to 8000",
  ];

  // Toggle Filter checkboxes
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) {
        updated[type].push(value);
      } else {
        updated[type] = updated[type].filter(v => v !== value);
      }
      return updated;
    });
  };

  // Sorting Function
  const sortProperties = (a, b) => {
    if (selectedSort === "Low to High") return a.price.sale - b.price.sale;
    if (selectedSort === "High to Low") return b.price.sale - a.price.sale;
    return 0;
  };

  // Price Filter
  const matchesPrice = (property) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some(range => {
      const [ min, max ] = range.split(" to ").map(Number);
      return property.price.sale >= min && property.price.sale <= max;
    });
  };

  // Type Filter
  const matchesType = (property) => {
    if (selectedFilters.propertyTypes.length === 0) return true;
    return selectedFilters.propertyTypes.includes(property.propertyTypes);
  };

  // Search Filter useing header's searchQuery
  const matchesSearch = (property) => {
    if (!searchQuery) return true;
    return (
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Hero destination filter (from Hero form -> /listing?destination=....)
  const matchsHeroDestination = (property)=> {
    if(!heroDestination) return true
    return (property.city || "").toLowerCase().includes(heroDestination)
  }

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    return (
      properties.filter((p) => matchesType(p) && matchesPrice(p) &&
      matchesSearch(p) && matchsHeroDestination(p)).sort(sortProperties)
    );
  }, [properties, selectedFilters, selectedSort, searchQuery, heroDestination]);

  return (
    <div className="bg-gradient-to-r from-#fffbee to-white py-16 pt-28">
      <div className="max-padd-container flex flex-col sm:flex-row gap-8 mb-16">
        {/* left side Filters */}
        <div className="bg-secondary/10 ring-1 ring-slate-900/5 p-4 sm:min-w-60 sm:h-[600px] rounded-xl">
          {/* Sort  by price*/}
          <div className="py-3 mt-4">
            <h5 className="h5 mb-3">Sort By</h5>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-secondary/10 border border-slate-900/10 outline-none text-gray-30 medium-14 h-8 w-full rounded px-2"
            >
              {sortOptions.map((sort, index) => (
                <option key={index} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
          {/* property Type */}
          <div className="py-3 mt-4">
            <h5 className="h5 mb-4">Property Type</h5>
            {propertyTypes.map((type) => (
              <label key={type} className="flex gap-2 medium-14">
                <input
                  type="checkbox"
                  checked={selectedFilters.propertyTypes.includes(type)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, type, "propertyTypes")
                  }
                />
                {type}
              </label>
            ))}
          </div>

          {/* price Range */}
          <div className="py-3 mt-4">
            <h5 className="h5 mb-4">Price Range</h5>
            {priceRange.map((price) => (
              <label key={price} className="flex gap-2 medium-14">
                <input
                  type="checkbox"
                  checked={selectedFilters.priceRange.includes(price)}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, price, "priceRange")
                  }
                />
                ${price}
              </label>
            ))}
          </div>
        </div>

        {/* RIght Side */}
        <div className="min-h-[97vh] overflow-y-scroll rounded-xl">
          {filteredProperties.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <Item key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20 ">
              No match found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
