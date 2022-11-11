<template>
	<div class="container">
		<header>
			<nav>
				<ul>
					<li>
						<h1>
							<RouterLink to="/">
								<img src="@/assets/new-logo.svg" alt="" /> Honk
							</RouterLink>
						</h1>
					</li>
				</ul>
				<slot name="nav"></slot>
			</nav>
		</header>
		<main>
			<slot></slot>
		</main>
	</div>
</template>
