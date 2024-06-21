import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'


const NotFound = () => {
  return (
    <>
    <section className='notfound'>
      <div className="contaner">
        <img src="/notFound.svg" alt="notFound" />
        <h1>LOOKS LIKE YOU'RE LOST</h1>
        <p>we can't seem to find you the page you're loooking for</p>
        <Link to={"/"}>
          Back to Home{" "}
          <span>
            <HiOutlineArrowNarrowRight/>
            </span>
            </Link>
      </div>
    </section>
    </>
  )
};

export default NotFound;