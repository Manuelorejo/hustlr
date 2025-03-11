import { CiLocationOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import microsoft_logo from "../../../assets/icons/microsoft.svg";
import spotify_logo from "../../../assets/icons/spotify.svg";
import slack_logo from "../../../assets/icons/slack.svg";
import google_logo from "../../../assets/icons/google.svg";
import clickup_logo from "../../../assets/icons/clickup.svg";
import craft_logo from "../../../assets/icons/craft.svg";
import amazon_logo from "../../../assets/icons/amazon.svg";
import airbnb_logo from "../../../assets/icons/airbnb.svg";
import cloudflare_logo from "../../../assets/icons/cloudflare.svg";
import discord_logo from "../../../assets/icons/discord.svg";

const companyLogos = [
  { logo: microsoft_logo, name: "Microsoft", position: "lg:top-10 lg:left-10 top-5 left-5" },
  { logo: spotify_logo, name: "Spotify", position: "lg:top-20 lg:right-20 top-10 right-10" },
  { logo: slack_logo, name: "Slack", position: "lg:bottom-10 lg:left-20 bottom-5 left-10" },
  { logo: google_logo, name: "Google", position: "lg:bottom-20 lg:right-10 bottom-10 right-5" },
  { logo: clickup_logo, name: "ClickUp", position: "lg:top-1/5 lg:left-1/3 top-1/6 left-1/4" },
  { logo: craft_logo, name: "Craft", position: "lg:top-28 lg:right-2/5 top-14 right-1/3" },
  { logo: amazon_logo, name: "Amazon", position: "lg:bottom-1/12 lg:right-1/5 bottom-5 right-1/6" },
  { logo: airbnb_logo, name: "Airbnb", position: "lg:top-1/3 lg:right-1/6 top-1/4 right-1/5" },
  { logo: cloudflare_logo, name: "Cloudflare", position: "lg:bottom-16 lg:right-1/3 bottom-16 right-1/3" },
  { logo: discord_logo, name: "Discord", position: "lg:bottom-0 lg:left-2/5 bottom-2 left-1/3" },
];

type SearchFormInputs = {
  jobTitle: string;
  location: string;
};

type HeaderProps = {
  setSearchParams: (params: SearchFormInputs) => void;
  isLoading : boolean;
  error: Error | null;
};

const Header:React.FC<HeaderProps> = ({setSearchParams, isLoading, error}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInputs>();

  const onSubmit = (data: SearchFormInputs) => {
    setSearchParams(data);
  };

  return (
    <header className="relative min-h-[calc(100svh-5rem)] lg:min-h-120 flex flex-col justify-center bg-white p-5 lg:p-10 text-center space-y-5">
      {/* Floating Logos in Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {companyLogos.map((company, index) => (
          <img
            key={index}
            src={company.logo}
            alt={company.name}
            className={`absolute w-8 h-8 animate-float ${company.position}`}
          />
        ))}
      </div>

      {/* Content Section - Higher z-index */}
      <div className="relative z-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-left">
          Find Your Dream Job
        </h1>
        <p className="text-lg lg:text-xl opacity-80 my-2 text-left">
          Search thousands of job listings tailored for you.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex gap-5 flex-col lg:flex-row"
        >
          {/* Job Title Input */}
          <div className="w-full flex-1">
            <input
              type="text"
              placeholder="Job title, keywords..."
              className={`input-field bg-white h-12 border rounded-full p-4 lg:flex-1 ${
                errors.jobTitle && "border-red-500"
              }`}
              {...register("jobTitle", { required: "Job title is required" })}
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.jobTitle.message}
              </p>
            )}
            {
              error && (
                <p>{error.message}</p>
              )
            }
          </div>

          {/* Location Input */}
          <div className="input-field bg-white h-12 rounded-full lg:flex-1 flex items-center overflow-hidden border">
            <div className="h-full w-10 flex items-center justify-center">
              <CiLocationOn className="text-xl" />
            </div>
            <input
              type="text"
              placeholder="Anywhere"
              className="outline-none flex-1 h-full"
              {...register("location")}
            />
          </div>

          {/* Search Button */}
          <button type="submit" className="button-primary mt-0 lg:w-32" disabled={isLoading}>
            {
              isLoading ? <AiOutlineLoading3Quarters className="text-2xl animate-spin" /> : "Search"
            }
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
