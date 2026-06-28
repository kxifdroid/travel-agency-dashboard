import React from 'react'
import {Link, useLocation} from "react-router";
import {ChipDirective, ChipListComponent, ChipsDirective} from "@syncfusion/ej2-react-buttons";
import {cn, getFirstWord} from "~/lib/utils";

interface TripCardComponentProps {
    id: string;
    name: string;
    imageUrls: string;
    location: string;
    tags: string[];
    price: string;
}

const TripCard = ({id, name, imageUrls, location, tags, price}: TripCardComponentProps) => {
    const path = useLocation();
    return (
        <Link to={path.pathname === '/' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`} className="trip-card">
            <img src={imageUrls} />
            <article>
                <h2>{name}</h2>
                <figure>
                    <img
                        src="/assets/icons/location-mark.svg"
                        alt="location" className="size-4"
                    />
                    <figcaption>{location}</figcaption>
                </figure>
            </article>
            <div className="mt-5 pl-[18px] pr-3.5 pb-5">
                <ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {tags.map((tag: string, index: number) => (
                            <ChipDirective
                                key={index}
                                text={getFirstWord(tag)}
                                cssClass={cn(index===1
                                    ? '!bg-pink-50 !text-pink-500'
                                    : '!bg-success-50 !text-success-700')}

                            ></ChipDirective>
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </div>
            <article className="tripCard-pill">{price}</article>
        </Link>
    )
}
export default TripCard