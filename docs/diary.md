## New Beginnings. Or rather, A fresh start...

### Wednesday, September 21st 3:48PM PST 2022

---

Today marks the first significant day of beginning the (re-)work of my website. The last time I touched this code was close to 3 years ago. That being said, it can be inferred that the website is extremely outdated.

The first time I was putting it together, I made a point of trying to show off some React and TypeScript knowledge. Part of this "showing off" was showcasing a mildly interactive resume which, looking back on it, really isn't that good.

This time around, I will be taking a different approach.

I will maintain the interactive nature of the resume while buffing its functionality, making it more responsive and accommodating to screen sizes, but mostly focusing on first accommodating the desktop view in a pleasant manner. Perhaps I will do some research into the responsiveness nature of web apps, particularly in the context of the mobile view; I will have to evaluate how much time incorporating that accommodation will take with respect to my development timeline and other things that I have to get done over the next couple of months. Perhaps there is a framework or library out there that can help me out. I will have to do some digging.

Regarding other things... There are a few points of importance that should be made with respect to my intentions for this app:

- For one, I will be taking the "minimalist" approach with the styling and qualitative manner of the site. In other words, I will be taking a "Content First" approach.
- On that note, I will be injecting 30x more authenticity into the application. The home page will, more or less, feature a concisely articulated essay that attempts to explain what and who I am in the fewest words possible.
- I will be adding a section, either on a separate page or at the bottom of the home page, strictly dedicated to showcasing project work. Specifically, each portion of this section featuring the various projects will consist of a title, a GIF showcasing the app in action, and a series of bulletpoints highlighting some of the more important aspects of each project.
- Last but not least, I will feature links to my blog that I will be building over the next 2-4 weeks. Well, the blog itself is something that I could realistically finish building in a single day using something like Wordpress, it's just a matter of actually getting it done alongside this project.

That's all for now.

The first thing to do will be acquiring artifacts, like the GIFs of my projects working in action. Once I have this done, testing the view of the various GIFs will be much simpler. I think that would be an excellent place to jump in and get my feet wet with web development again.

Until tomorrow.

---
## Annoyance
### Wednesday, October 12th 4:41PM PST 2022
---

Before taking off yesterday, I somehow managed to completely break the SSH key configuration that I had established with the repository several weeks ago. So today, all my time was painstakingly spent figuring this out. It was pretty darn annoying, especially considering I had already set up a new key and had it working perfectly already. I could go into the details of what was wrong and how I eventually fixed it, but I'd rather not. My brain has had enough of this for today. I am off to the gym.

At the very least, we made progress today. Pushes can now be made without issue to the remote repository, and things are up-to-date. We are in a good place for tomorrow. GAH

---
## Progress.
### Thursday, October 13th 5:27PM PST 2022
---

Decent steps were taken today. The site is starting to take shape. The header styling is nearly done. It's actually already starting to look a little bit like a website. Looking forward to making more progress tomorrow.

---
## Roadblocks

### Friday, October 21st 4:24PM PST
---

The past week, I have made considerable progress on my website development. I haven't actually really made commits as often as I should. Part of this is due to the fact that my output has been pretty small. In large part, this is due to me trying to figure out things that I actually want to have on my website. In fact, I have spent 2 to 3 days just brainstorming and writing potential things that I could have in a biography. I have become hyperconsumed with what others may think of me, instead of simply focusing on output.

In essence, the homepage is pretty much done. All I really have to do at this point is put together a couple of supporting pages -- the reading list page and the page featuring my projects -- and I will be good to go.

Moving forward (particularly this weekend), I need to be extremely goal-oriented, focusing on small milestones and precise things that I want to accomplish. In doing so, I can break down seemingly difficult tasks into smaller, much simpler tasks.

---

## Recalibration

### Wednesday, October 26th 4:11PM PST

---

This month has been a rough one for me in terms of programming. Despite coming off a much more complex and code-heavy project in a relatively graceful manner, development on this considerably simpler project has been painstakingly slow.

There are a few reasons for this.

- For one, I have been self-sabotaging myself on the weekends for the past 2-3 weeks. Given that my conscience recognizes I am getting closer to the notion of having some success in the hunt for meaningful employment, and that meaningful well-paid employment is generally something I am foreign to, I believe my conscience is scared of the potential for failure and rejection; and so instead of leaving the potential for success or failure in the balance, my subconscious has coerced me into sedating myself with binging junk food and Game of Thrones while smoking marijuana. While it is true that the power to make decisions lies completely within my control, I relinquished control over my decision-making over a period of several months where my routine and principles became increasingly relaxed. This week has been a week of recuperation, restating my principles for life and reinforcing what my daily routine should look like to maximize success for myself.
- My approach to this project has been much more disorganized than it was for the previous project. To my detriment, I have taken things much less seriously, failing to put adequate plans on paper. I addressed this today by mapping the remaining steps that I have to complete before I put my site development to rest for the foreseeable future.
- Related to the previous point, the smaller nature of this project subconsciously led me to take its development for granted, instead of attacking the process with ferociousness as I should have. Again, I am addressing this now and today. SE Ferocity will now resume.
- Lastly, I started pushing commits on a new git branch without even really thinking about the totality of changes that I wanted to bring in to my website. Looking at the situation now, I would be infinitely better off by simply adding to and modifying the existing code base, instead of deleting existing code and starting anew. As of today, I will be working off of the "main" branch, manually incorporating desirable changes from the "minimal" branch.

This is where we're at as of now. With a good direction on paper, I am optimistic. Sure, the website is going to take longer than I bargained to get up and running, but that's okay. The important thing is for me to adapt, improvise and overcome. Yeti out.

---

## Significant Progress
### Thursday, October 27th 4:56PM PST

---

Although it may not seem like much, big steps were taken today. After having not touched React/Redux for awhile, I was able to write a reducer to preemptively load an 'About Me' text file (similar to how I load the config.json file), and use the contents of said text file to populate the 'About Me' dropdown window.

Before going with the standard "require()", I went through several other options, including FileReader() and fs.readFileSync(); to avoid not reading the text file in time, I simply read the text file contents alongside the config.json file in DataRef.

Initially, I was going to try using the same reducer for each files, and out of desire to not disrupt the state config, I opted to simply use another reducer. Seems to work nicely.

Tomorrow, we will be spending some time styling our components in a more fashionable manner (i.e., ensure text is fitting inside the given window, etc).