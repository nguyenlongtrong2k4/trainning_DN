import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Works</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <div className="main_1">
          <img src="/image/image.jpg" alt="" />
        </div>

        <div className="main_2">
          <div className="item_main_2">
            <div className="main-text">
              <div className="line-1">This year</div>
              <div className="line-2">Start your own business</div>
            </div>

            <div className="bottom-right">
              <div className="info">Check out for more info</div>
              <a href="#" className="btn-box">
                Click Here
              </a>
            </div>

            <div className="decor-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="socials">
              <a href="#">
                <img src="/image/fb.jpg" alt="" />
              </a>
              <a href="#">
                <img src="/image/wa.jpg" alt="" />
              </a>
              <a href="#">
                <img src="/image/yt.jpg" alt="" />
              </a>
              <a href="#">
                <img src="/image/ig.jpg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}