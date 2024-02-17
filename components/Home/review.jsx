import { Reveal } from "../RevealFramer";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";

const Review = ({ lng }) => {
  const peopleData = {
    user: [
      {
        name: "Nikoloz  Kobaidze1",
        username: "@nikolozkobaidze",
        tag: "#EduSpaceFrontend",
        following: "4",
        followers: "97.1K",
        color: "danger",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        en: {
          comment:
            "EduSpace made coding feel like a breeze! Step-by-step tutorials and interactive exercises helped me get through the programming screen quickly.",
        },
        ka: {
          comment:
            "EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი! ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.გმადლობთ, EduSpace, რომ გადამაქციე კოდირების ენთუზიასტად!",
        },
      },
      {
        name: "Nikoloz  Kobaidze2",
        username: "@kobaidze1",
        tag: "#MobileWithNika",
        color: "success",
        following: "1",
        followers: "1k",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        en: {
          comment:
            "EduSpace made coding feel like a breeze! Step-by-step tutorials and interactive exercises helped me get through the programming screen quickly.",
        },
        ka: {
          comment:
            "EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი! ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.გმადლობთ, EduSpace, რომ გადამაქციე კოდირების ენთუზიასტად!",
        },
      },
      {
        name: "Nikoloz  Kobaidze3",
        username: "@nikanika122",
        tag: "#EduSpaceMobile",
        color: "warning",
        following: "30",
        followers: "50k",
        image: "https://i.pravatar.cc/100?img=1",
        en: {
          comment:
            "EduSpace made coding feel like a breeze! Step-by-step tutorials and interactive exercises helped me get through the programming screen quickly.",
        },
        ka: {
          comment:
            "EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი! ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.გმადლობთ, EduSpace, რომ გადამაქციე კოდირების ენთუზიასტად!",
        },
      },
    ],
  };
  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="w-full   px-5 py-16 md:py-24 dark:text-white text-black">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-5 dark:text-white text-black">
                What people <br />
                are saying.
              </h1>
              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-40 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
              </div>
            </div>
            <div className="-mx-3 md:flex items-start">
              {peopleData.user.map((person, index) => (
                <Reveal key={index} delay={index * 0.2}>
                  <div className="w-full mx-auto rounded-lg  p-5 text-gray-800  font-light mb-6">
                    <Card className="max-w-[340px] bg-[#161b22] ">
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar
                            isBordered
                            color={person.color}
                            radius="full"
                            size="md"
                            src={person.image}
                          />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">
                              {person.name}
                            </h4>
                            <h5 className="text-small tracking-tight text-default-400">
                              {person.username}
                            </h5>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="px-3 py-0 text-small text-default-400">
                        <p>
                          {lng === "en" ? person.en.comment : person.ka.comment}
                        </p>
                        <span className="pt-2">{person.tag}</span>
                      </CardBody>
                      <CardFooter className="gap-3">
                        <div className="flex gap-1">
                          <p className="font-semibold text-default-400 text-small">
                            {person.following}
                          </p>
                          <p className=" text-default-400 text-small">
                            Following
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <p className="font-semibold text-default-400 text-small">
                            {person.followers}
                          </p>
                          <p className="text-default-400 text-small">
                            Followers
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
